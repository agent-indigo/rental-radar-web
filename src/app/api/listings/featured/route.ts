import authentication from '@/connectors/authentication'
import error500response from '@/httpResponses/error500response'
import success200response from '@/httpResponses/success200response'
import amenitySqlModel from '@/models/amenitySqlModel'
import imageUrlSqlModel from '@/models/imageUrlSqlModel'
import listingSqlModel from '@/models/listingSqlModel'
import Amenity from '@/types/Amenity'
import ImageUrl from '@/types/ImageUrl'
import Listing from '@/types/Listing'
import connectToSqlDb from '@/utilities/connectToSqlDb'
import {UserWithRole} from 'better-auth/plugins'
import {
  NextRequest,
  NextResponse
} from 'next/server'
import {Model} from 'sequelize'
export const dynamic = 'force-dynamic'
export const GET = async (request: NextRequest): Promise<NextResponse> => {
  try {
    await connectToSqlDb()
    return success200response({
      ...await listingSqlModel.findAll({
        where: {
          isFeatured: true
        }
      }).then((listings: Model<Listing>[]): Promise<Listing[]> => Promise.all(listings.map(async (listing: Model<Listing>): Promise<Listing> => {
        const id: string | undefined = listing.getDataValue('id')
        const {
          name,
          email
        }: UserWithRole = await authentication.api.getUser({
          query: {
            id: listing.getDataValue('ownerId')
          },
          headers: request.headers
        })
        return {
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
        }
      })))
    })
  } catch(error: any) {
    return error500response(error)
  }
}