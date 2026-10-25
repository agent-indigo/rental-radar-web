import authentication from '@/connectors/authentication'
import error500response from '@/httpResponses/error500response'
import success200response from '@/httpResponses/success200response'
import amenitySqlModel from '@/models/amenitySqlModel'
import imageUrlSqlModel from '@/models/imageUrlSqlModel'
import listingSqlModel from '@/models/listingSqlModel'
import Amenity from '@/types/Amenity'
import ImageUrl from '@/types/ImageUrl'
import Listing from '@/types/Listing'
import {UserWithRole} from 'better-auth/plugins'
import {
  NextRequest,
  NextResponse
} from 'next/server'
import {
  Op,
  Model
} from 'sequelize'
export const dynamic = 'force-dynamic'
export const GET = async (request: NextRequest): Promise<NextResponse> => {
  try {
    const {searchParams}: URL = new URL(request.url)
    const keywords: string | null = searchParams.get('keywords')
    const type: string | null = searchParams.get('type')
    const page: string | null = searchParams.get('page')
    const normalizedKeywords: string = typeof keywords === 'string' ? keywords.trim() : ''
    return success200response({
      ...await listingSqlModel.findAll({
        where: {
          ...(type === 'All' ? {} : {type: type ?? undefined}),
          ...(normalizedKeywords ? {
            [Op.or]: [
              {title: {[Op.iLike]: `%${normalizedKeywords}%`}},
              {description: {[Op.iLike]: `%${normalizedKeywords}%`}},
              {city: {[Op.iLike]: `%${normalizedKeywords}%`}},
              {state: {[Op.iLike]: `%${normalizedKeywords}%`}}
            ]
          } : {})
        },
        offset: page === '' ? undefined : (parseInt(page ?? '') - 1) * 6,
        limit: page === '' ? undefined : 6
      }).then((results: Model<Listing>[]): Promise<Listing[]> => Promise.all(results.map(async (result: Model<Listing>): Promise<Listing> => {
        const listingId: string | undefined = result.getDataValue('id')
        const {
          name: ownerName,
          email: ownerEmail
        }: UserWithRole = await authentication.api.getUser({
          query: {
            id: result.getDataValue('ownerId')
          },
          headers: request.headers
        })
        return {
          ...result.toJSON(),
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