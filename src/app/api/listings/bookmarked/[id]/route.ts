import authentication from '@/connectors/authentication'
import error401response from '@/httpResponses/error401response'
import error404response from '@/httpResponses/error404response'
import error500response from '@/httpResponses/error500response'
import success200response from '@/httpResponses/success200response'
import success204response from '@/httpResponses/success204response'
import bookmarkSqlModel from '@/models/bookmarkSqlModel'
import listingSqlModel from '@/models/listingSqlModel'
import Bookmark from '@/types/Bookmark'
import Listing from '@/types/Listing'
import RequestParams from '@/types/RequestParams'
import connectToSqlDb from '@/utilities/connectToSqlDb'
import {
  NextRequest,
  NextResponse
} from 'next/server'
import {Model} from 'sequelize'
export const DELETE = async (
  request: NextRequest,
  {params}: RequestParams
): Promise<NextResponse> => {
  try {
    const session = await authentication.api.getSession({
      headers: request.headers
    })
    if (session) {
      await connectToSqlDb()
      const bookmark: Model<Bookmark> | null = await bookmarkSqlModel.findOne({
        where: {
          userId: session.user.id,
          listingId: (await params).id
        }
      })
      if (bookmark) {
        const listing: Model<Listing> | null = await listingSqlModel.findByPk(bookmark.getDataValue('listingId'))
        if (listing) {
          await bookmark.destroy()
          return success204response
        } else {
          return error404response
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
  {params}: RequestParams
): Promise<NextResponse> => {
  try {
    const session = await authentication.api.getSession({
      headers: request.headers
    })
    if (session) {
      await connectToSqlDb()
      const bookmark: Model<Bookmark> | null = await bookmarkSqlModel.findOne({
        where: {
          userId: session.user.id,
          listingId: (await params).id
        }
      })
      if (bookmark) {
        const listing: Model<Listing> | null = await listingSqlModel.findByPk(bookmark.getDataValue('listingId'))
        return listing ? success200response(bookmark.toJSON()) : error404response
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