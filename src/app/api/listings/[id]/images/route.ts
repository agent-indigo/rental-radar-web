import authentication from '@/connectors/authentication'
import cloudinary from '@/connectors/cloudinary'
import error401response from '@/httpResponses/error401response'
import error404response from '@/httpResponses/error404response'
import error500response from '@/httpResponses/error500response'
import success200response from '@/httpResponses/success200response'
import amenitySqlModel from '@/models/amenitySqlModel'
import imageIdSqlModel from '@/models/imageIdSqlModel'
import imageUrlSqlModel from '@/models/imageUrlSqlModel'
import listingSqlModel from '@/models/listingSqlModel'
import Amenity from '@/types/Amenity'
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
export const POST = async (
  request: NextRequest,
  {params}: any
): Promise<NextResponse> => {
  try {
    const session = await authentication.api.getSession({
      headers: request.headers
    })
    if (session) {
      const {id: listingId} = await params
      await connectToSqlDb()
      const listing: Model<Listing> | null = await listingSqlModel.findByPk(listingId)
      if (listing) {
        const {id: userId}: User = session.user
        if (listing.getDataValue('ownerId') === userId) {
          await Promise.all((await request.formData()).getAll('files').map(async (file: FormDataEntryValue): Promise<void> => {
            if (file instanceof File) {
              const {
                secure_url,
                public_id
              }: UploadApiResponse = await cloudinary.uploader.upload(
                `data:image/png;base64,${Buffer.from(new Uint8Array(await file.arrayBuffer())).toString('base64')}`, {
                  folder: process.env.CLOUDINARY_FOLDER_NAME ?? 'RentalRadar'
                }
              )
              await imageUrlSqlModel.create({
                listingId,
                imageUrl: secure_url
              })
              await imageIdSqlModel.create({
                listingId,
                imageId: public_id
              })
            }
          }))
          const {
            name: ownerName,
            email: ownerEmail
          }: UserWithRole = await authentication.api.getUser({
            query: {
              id: listing.getDataValue('ownerId')
            },
            headers: request.headers
          })
          revalidatePath(
            '/',
            'layout'
          )
          return success200response({
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
          })
        } else {
          return error401response
        }
      } else {
        return error404response
      }
    } else {
      return error401response
    }
  } catch(error: any) {
    return error500response(error)
  }
}