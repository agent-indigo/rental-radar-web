import authentication from '@/connectors/authentication'
import error401response from '@/httpResponses/error401response'
import error404response from '@/httpResponses/error404response'
import error500response from '@/httpResponses/error500response'
import success200response from '@/httpResponses/success200response'
import success204response from '@/httpResponses/success204response'
import inquirySqlModel from '@/models/inquirySqlModel'
import listingSqlModel from '@/models/listingSqlModel'
import Id from '@/types/Id'
import Inquiry from '@/types/Inquiry'
import Listing from '@/types/Listing'
import RequestParams from '@/types/RequestParams'
import connectToSqlDb from '@/utilities/connectToSqlDb'
import {User} from 'better-auth'
import {UserWithRole} from 'better-auth/plugins'
import {revalidatePath} from 'next/cache'
import {
  NextRequest,
  NextResponse
} from 'next/server'
import {Model} from 'sequelize'
export const PATCH = async (
  request: NextRequest,
  {params}: RequestParams
): Promise<NextResponse> => {
  try {
    const session = await authentication.api.getSession({
      headers: request.headers
    })
    if (session) {
      const {id: inquiryId}: Id = await params
      await connectToSqlDb()
      const inquiry: Model<Inquiry> | null = await inquirySqlModel.findByPk(inquiryId)
      if (inquiry) {
        const listing: Model<Listing> | null = await listingSqlModel.findByPk(inquiry.getDataValue('listingId'))
        if (listing) {
          const {id: userId}: User = session.user
          if (inquiry.getDataValue('recipientId') === userId) {
            const {
              name: senderName,
              email: senderEmail
            }: UserWithRole = await authentication.api.getUser({
              query: {
                id: inquiry.getDataValue('senderId')
              },
              headers: request.headers
            })
            inquiry.setDataValue(
              'isRead',
              !inquiry.getDataValue('isRead')
            )
            await inquiry.save()
            revalidatePath(
              '/',
              'layout'
            )
            return success200response({
              ...inquiry.toJSON(),
              senderName,
              senderEmail,
              listingTitle: listing.getDataValue('title')
            })
          } else {
            return error401response
          }
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
export const DELETE = async (
  request: NextRequest,
  {params}: RequestParams
): Promise<NextResponse> => {
  try {
    const session = await authentication.api.getSession({
      headers: request.headers
    })
    if (session) {
      const {id: inquiryID}: Id = await params
      const inquiry: Model<Inquiry> | null = await inquirySqlModel.findByPk(inquiryID)
      if (inquiry) {
        const listing: Model<Listing> | null = await listingSqlModel.findByPk(inquiry.getDataValue('listingId'))
        if (listing) {
          const {id: userId}: User = session.user
          if (inquiry.getDataValue('recipientId') === userId) {
            await inquiry.destroy()
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
        return error404response
      }
    } else {
      return error401response
    }
  } catch(error: any) {
    return error500response(error)
  }
}