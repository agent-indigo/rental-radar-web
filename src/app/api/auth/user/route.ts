import authentication from '@/configuration/authentication'
import error401response from '@/httpResponses/error401response'
import error500response from '@/httpResponses/error500response'
import success200response from '@/httpResponses/success200response'
import inquirySqlModel from '@/models/inquirySqlModel'
import {User} from 'better-auth'
import {
  NextRequest,
  NextResponse
} from 'next/server'
export const dynamic = 'force-dynamic'
export const GET = async (request: NextRequest): Promise<NextResponse> => {
  try {
    const session = await authentication.api.getSession({
      headers: request.headers
    })
    if (session) {
      const {
        id,
        image
      }: User = session.user
      return success200response({
        id,
        image,
        unreadInquiriesCount: await inquirySqlModel.count({
          where: {
            recipientId: id,
            isRead: false
          }
        })
      })
    } else {
      return error401response
    }
  } catch (error: any) {
    return error500response(error)
  }
}