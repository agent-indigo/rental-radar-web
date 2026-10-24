import authentication from '@/connectors/authentication'
import error401response from '@/httpResponses/error401response'
import error500response from '@/httpResponses/error500response'
import success200response from '@/httpResponses/success200response'
import amenitySqlModel from '@/models/amenitySqlModel'
import imageUrlSqlModel from '@/models/imageUrlSqlModel'
import listingSqlModel from '@/models/listingSqlModel'
import Amenity from '@/types/Amenity'
import ImageUrl from '@/types/ImageUrl'
import Listing from '@/types/Listing'
import connectToSqlDb from '@/utilities/connectToSqlDb'
import {User} from 'better-auth'
import {
  NextRequest,
  NextResponse
} from 'next/server'
import {Model} from 'sequelize'
export const dynamic = 'force-dynamic'
export const GET = async (request: NextRequest): Promise<NextResponse> => {
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
      await connectToSqlDb()
      return success200response({
        ...await listingSqlModel.findAll({
          where: {
            ownerId
          }
        }).then((listings: Model<Listing>[]): Promise<Listing[]> => Promise.all(listings.map(async (listing: Model<Listing>): Promise<Listing> => {
          const listingId: string | undefined = listing.getDataValue('id')
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
    } else {
      return error401response
    }
  } catch(error: any) {
    return error500response(error)
  }
}