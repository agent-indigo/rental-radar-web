import authentication from '@/connectors/authentication'
import cloudinary from '@/connectors/cloudinary'
import error401response from '@/httpResponses/error401response'
import error500response from '@/httpResponses/error500response'
import success200response from '@/httpResponses/success200response'
import amenitySqlModel from '@/models/amenitySqlModel'
import imageIdSqlModel from '@/models/imageIdSqlModel'
import imageUrlSqlModel from '@/models/imageUrlSqlModel'
import listingSqlModel from '@/models/listingSqlModel'
import Amenity from '@/types/Amenity'
import ImageId from '@/types/ImageId'
import ImageUrl from '@/types/ImageUrl'
import Listing from '@/types/Listing'
import connectToSqlDb from '@/utilities/connectToSqlDb'
import {User} from 'better-auth'
import {UserWithRole} from 'better-auth/plugins'
import {UploadApiResponse} from 'cloudinary'
import {revalidatePath} from 'next/cache'
import {
  NextRequest,
  NextResponse
} from 'next/server'
import {Model} from 'sequelize'
export const POST = async (request: NextRequest): Promise<NextResponse> => {
  try {
    const session = await authentication.api.getSession({
      headers: request.headers
    })
    if (session) {
      const {
        id: ownerId,
        name: ownerName,
        email: ownerEmail
      }: User = session.user
      const formData: FormData = await request.formData()
      const amenities: string[] = formData.getAll('amenities').map((amenity: FormDataEntryValue): string => amenity.valueOf().toString())
      const imageUrls: string[] = []
      const ImageIds: string[] = []
      await Promise.all(formData.getAll('files').map(async (file: FormDataEntryValue): Promise<void> => {
        if (file instanceof File) {
          const {
            secure_url,
            public_id
          }: UploadApiResponse = await cloudinary.uploader.upload(
            `data:image/png;base64,${Buffer.from(new Uint8Array(await file.arrayBuffer())).toString('base64')}`, {
              folder: process.env.CLOUDINARY_FOLDER_NAME ?? 'RentalRadar'
            }
          )
          imageUrls.push(secure_url)
          ImageIds.push(public_id)
        }
      }))
      await connectToSqlDb()
      const listing: Model<Listing> = await listingSqlModel.create({
        ownerId,
        title: formData.get('title')!.valueOf().toString(),
        type: formData.get('type')!.valueOf().toString(),
        description: formData.get('description')!.valueOf().toString(),
        street: formData.get('street')!.valueOf().toString(),
        city: formData.get('city')!.valueOf().toString(),
        state: formData.get('state')!.valueOf().toString(),
        zip: formData.get('zip')!.valueOf().toString(),
        beds: parseInt(formData.get('beds')!.valueOf().toString()),
        baths: parseInt(formData.get('baths')!.valueOf().toString()),
        sqft: parseInt(formData.get('sqft')!.valueOf().toString()),
        nightlyRate: parseInt(formData.get('nightlyRate')?.valueOf().toString() ?? ''),
        weeklyRate: parseInt(formData.get('weeklyRate')?.valueOf().toString() ?? ''),
        monthlyRate: parseInt(formData.get('monthlyRate')?.valueOf().toString() ?? ''),
        ownerPhone: formData.get('ownerPhone')?.valueOf().toString(),
        isFeatured: false
      })
      const listingId: string | undefined = listing.getDataValue('id')
      if (listingId) {
        await Promise.all(amenities.map(async (amenity: string): Promise<Model<Amenity>> => await amenitySqlModel.create({
          listingId,
          amenity
        })))
        await Promise.all(imageUrls.map(async (imageUrl: string): Promise<Model<ImageUrl>> => await imageUrlSqlModel.create({
          listingId,
          imageUrl
        })))
        await Promise.all(ImageIds.map(async (imageId: string): Promise<Model<ImageId>> => await imageIdSqlModel.create({
          listingId,
          imageId
        })))
      }
      revalidatePath(
        '/',
        'layout'
      )
      return success200response({
        ...listing.toJSON(),
        amenities,
        imageUrls,
        ownerName,
        ownerEmail
      })
    } else {
      return error401response
    }
  } catch(error: any) {
    return error500response(error)
  }
}
export const GET = async (request: NextRequest): Promise<NextResponse> => {
  try {
    const page: string = new URL(request.url).searchParams.get('page') ?? ''
    await connectToSqlDb()
    return success200response({
      ...await listingSqlModel.findAll({
        offset: page === '' ? undefined : (parseInt(page) - 1) * 6,
        limit: page === '' ? undefined : 6
      }).then((listings: Model<Listing>[]): Promise<Listing[]> => Promise.all(listings.map(async (listing: Model<Listing>): Promise<Listing> => {
        const listingId: string | undefined = listing.getDataValue('id')
        const {
          name: ownerName,
          email: ownerEmail
        }: UserWithRole = await authentication.api.getUser({
          query: {
            id: listing.getDataValue('ownerId')
          },
          headers: request.headers
        })
        return {
          ...listing.toJSON(),
          ownerName,
          ownerEmail,
          amenities: await amenitySqlModel.findAll({
            where: {
              listingId
            }
          }).then((amenities: Model<Amenity>[]): string[] => amenities.map((amenity: Model<Amenity>): string => amenity.getDataValue('amenity'))),
          imageUrls: await imageUrlSqlModel.findAll({
            where: {
              listingId
            }
          }).then((imageUrls: Model<ImageUrl>[]): string[] => imageUrls.map((imageUrl: Model<ImageUrl>): string => imageUrl.getDataValue('imageUrl')))
        }
      })))
    })
  } catch(error: any) {
    return error500response(error)
  }
}