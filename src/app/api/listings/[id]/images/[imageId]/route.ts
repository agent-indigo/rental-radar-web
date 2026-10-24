import authentication from '@/connectors/authentication'
import cloudinary from '@/connectors/cloudinary'
import error401response from '@/httpResponses/error401response'
import error404response from '@/httpResponses/error404response'
import error500response from '@/httpResponses/error500response'
import success201response from '@/httpResponses/success201response'
import amenitySqlModel from '@/models/amenitySqlModel'
import imageIdSqlModel from '@/models/imageIdSqlModel'
import imageUrlSqlModel from '@/models/imageUrlSqlModel'
import listingSqlModel from '@/models/listingSqlModel'
import Amenity from '@/types/Amenity'
import ImageUrl from '@/types/ImageUrl'
import Listing from '@/types/Listing'
import connectToSqlDb from '@/utilities/connectToSqlDb'
import {revalidatePath} from 'next/cache'
import {
  NextRequest,
  NextResponse
} from 'next/server'
import {Model} from 'sequelize'
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
      const {
        id: listingId,
        imageId
      } = await params
      await connectToSqlDb()
      const listing: Model<Listing> | null = await listingSqlModel.findByPk(listingId)
      if (listing) {
        const {
          id: userId,
          name,
          email
        } = session.user
        if (listing.getDataValue('ownerId') === userId) {
          await imageUrlSqlModel.findAll({
            where: {
              listingId
            }
          }).then((imageUrls: Model<ImageUrl>[]): Promise<void[]> => Promise.all((imageUrls.map(async (imageUrl: Model<ImageUrl>): Promise<void> => {
            if (imageUrl.getDataValue('imageUrl').includes(imageId)) await imageUrl.destroy()
          }))))
          await imageIdSqlModel.destroy({
            where: {
              listingId,
              imageId
            }
          })
          await cloudinary.uploader.destroy(imageId)
          revalidatePath(
            '/',
            'layout'
          )
          return success201response({
            ...listing.toJSON(),
            ownerName: name,
            ownerEmail: email,
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