import authentication from "@/connectors/authentication"
import error401response from "@/httpResponses/error401response"
import error404response from "@/httpResponses/error404response"
import error500response from "@/httpResponses/error500response"
import success200response from "@/httpResponses/success200response"
import bookmarkSqlModel from "@/models/bookmarkSqlModel"
import listingSqlModel from "@/models/listingSqlModel"
import Bookmark from "@/types/Bookmark"
import Listing from "@/types/Listing"
import connectToSqlDb from "@/utilities/connectToSqlDb"
import {User} from "better-auth"
import {
  NextRequest,
  NextResponse
} from "next/server"
import {Model} from "sequelize"
export const dynamic = 'force-dynamic'
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
        const {id: userId}: User = session.user
        const bookmark: Model<Bookmark> | null = await bookmarkSqlModel.findOne({
          where: {
            userId,
            listingId
          }
        })
        if (bookmark) {
          await bookmark.destroy()
          return success200response({
            isBookmarked: false
          })
        } else {
          await bookmarkSqlModel.create({
            userId,
            listingId
          })
          return success200response({
            isBookmarked: true
          })
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