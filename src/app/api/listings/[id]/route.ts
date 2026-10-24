import authentication from '@/connectors/authentication'
import cloudinary from '@/connectors/cloudinary'
import error401response from '@/httpResponses/error401response'
import error404response from '@/httpResponses/error404response'
import error500response from '@/httpResponses/error500response'
import success200response from '@/httpResponses/success200response'
import success201response from '@/httpResponses/success201response'
import success204response from '@/httpResponses/success204response'
import amenitySqlModel from '@/models/amenitySqlModel'
import imageUrlSqlModel from '@/models/imageUrlSqlModel'
import listingSqlModel from '@/models/listingSqlModel'
import Amenity from '@/types/Amenity'
import ImageUrl from '@/types/ImageUrl'
import Listing from '@/types/Listing'
import connectToSqlDb from '@/utilities/connectToSqlDb'
import {User} from 'better-auth'
import {UserWithRole} from 'better-auth/plugins'
import {revalidatePath} from 'next/cache'
import {
  NextRequest,
  NextResponse
} from 'next/server'
import {Model, Transaction} from 'sequelize'
export const dynamic = 'force-dynamic'
export const DELETE = async (
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
          listing.getDataValue('imageIds')?.map(async (imageId: string): Promise<void> => await cloudinary.uploader.destroy(imageId))
          await listing.destroy()
          revalidatePath(
            '/',
            'layout'
          )
          return success204response
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
export const PATCH = async (
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
        const {id: userId} = session.user
        if (listing.getDataValue('ownerId') === userId) {
          const {
            title,
            type,
            description,
            street,
            city,
            state,
            zip,
            beds,
            baths,
            sqft,
            amenities,
            nightlyRate,
            weeklyRate,
            monthlyRate,
            ownerPhone
          }: Partial<Listing> = await request.json()
          const changes: Partial<Listing> = {}
          if (title !== undefined) changes.title = title
          if (type !== undefined) changes.type = type
          if (description !== undefined) changes.description = description
          if (street !== undefined) changes.street = street
          if (city !== undefined) changes.city = city
          if (state !== undefined) changes.state = state
          if (zip !== undefined) changes.zip = zip
          if (beds !== undefined) changes.beds = beds
          if (baths !== undefined) changes.baths = baths
          if (sqft !== undefined) changes.sqft = sqft
          if (nightlyRate !== undefined) changes.nightlyRate = nightlyRate
          if (weeklyRate !== undefined) changes.weeklyRate = weeklyRate
          if (monthlyRate !== undefined) changes.monthlyRate = monthlyRate
          if (ownerPhone !== undefined) changes.ownerPhone = ownerPhone
          const {
            name: ownerName,
            email: ownerEmail
          }: UserWithRole = await authentication.api.getUser({
            query: {
              id: listing.getDataValue('ownerId')
            },
            headers: request.headers
          })
          await listing.sequelize.transaction(async (transaction: Transaction): Promise<void> => {
            await listing.update(
              changes, {
                transaction
              }
            )
            if (amenities !== undefined) {
              await amenitySqlModel.destroy({
                where: {
                  listingId
                },
                transaction
              })
              await amenitySqlModel.bulkCreate(amenities.map((amenity: string) => ({
                listingId,
                amenity
              })), {
                transaction
              })
            }
          })
          revalidatePath(
            '/',
            'layout'
          )
          return success201response({
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
export const GET = async (
  request: NextRequest,
  {params}: any
): Promise<NextResponse> => {
  try {
    const {id} = await params
    await connectToSqlDb()
    const listing: Model<Listing> | null = await listingSqlModel.findByPk(id)
    if (listing) {
      const {
        name,
        email
      }: UserWithRole = await authentication.api.getUser({
        query: {
          id: listing.getDataValue('ownerId')
        },
        headers: request.headers
      })
      return success200response({
        ...listing.toJSON(),
        ownerName: name,
        ownerEmail: email,
        amenities: await amenitySqlModel.findAll({
          where: {
            listingId: id
          }
        }).then((amenities: Model<Amenity>[]): string[] => amenities.map((amenity: Model<Amenity>): string => amenity.getDataValue('amenity'))),
        imageUrls: await imageUrlSqlModel.findAll({
          where: {
            listingId: id
          }
        }).then((imageUrls: Model<ImageUrl>[]): string[] => imageUrls.map((imageUrl: Model<ImageUrl>): string => imageUrl.getDataValue('imageUrl')))
      })
    } else {
      return error404response
    }
  } catch(error: any) {
    return error500response(error)
  }
}