import authentication from '@/connectors/authentication'
import error400response from '@/httpResponses/error400response'
import error401response from '@/httpResponses/error401response'
import error404response from '@/httpResponses/error404response'
import error500response from '@/httpResponses/error500response'
import success200response from '@/httpResponses/success200response'
import inquirySqlModel from '@/models/inquirySqlModel'
import listingSqlModel from '@/models/listingSqlModel'
import Inquiry from '@/types/Inquiry'
import Listing from '@/types/Listing'
import connectToSqlDb from '@/utilities/connectToSqlDb'
import {UserWithRole} from 'better-auth/plugins'
import {revalidatePath} from 'next/cache'
import {
  NextRequest,
  NextResponse
} from 'next/server'
import {Model} from 'sequelize'
export const POST = async (request: NextRequest): Promise<NextResponse> => {
  try {
    const session = await authentication.api.getSession({
      headers: request.headers
    })
    if (session) {
      const {
        id: senderId,
        name: senderName,
        email: senderEmail
      } = session.user
      const formData: FormData = await request.formData()
      const recipientId: string = formData.get('recipientId')!.valueOf().toString()
      if (recipientId !== senderId) {
        const listingId: string = formData.get('listingId')!.valueOf().toString()
        await connectToSqlDb()
        const listing: Model<Listing> | null = await listingSqlModel.findByPk(listingId)
        if (listing) {
          const inquiry: Model<Inquiry> = await inquirySqlModel.create({
            senderId,
            recipientId,
            listingId,
            senderPhone: formData.get('senderPhone')?.valueOf().toString(),
            body: formData.get('body')?.valueOf().toString(),
            isRead: false
          })
          revalidatePath(
            '/inquiries',
            'page'
          )
          return success200response({
            ...inquiry.toJSON(),
            senderName,
            senderEmail,
            listingTitle: listing.getDataValue('title')
          })
        } else {
          return error404response
        }
      } else {
        return error400response('send yourself an inquiry on your own listing')
      }
    } else {
      return error401response
    }
  } catch(error: any) {
    return error500response(error)
  }
}
export const GET = async (request: NextRequest): Promise<NextResponse> => {
  try {
    const session = await authentication.api.getSession({
      headers: request.headers
    })
    if (session) {
      await connectToSqlDb()
      return success200response({
        ...await inquirySqlModel.findAll({
          where: {
            recipientId: session.user.id
          }
        }).then((inquiries: Model<Inquiry>[]): Promise<Inquiry[]> => Promise.all(inquiries.map(async (inquiry: Model<Inquiry>): Promise<Inquiry> => {
          const {
            name: senderName,
            email: senderEmail
          }: UserWithRole = await authentication.api.getUser({
            query: {
              id: inquiry.getDataValue('senderId')
            },
            headers: request.headers
          })
          return {
            ...inquiry.toJSON(),
            listingTitle: await listingSqlModel.findByPk(inquiry.getDataValue('listingId')).then((listing: Model<Listing> | null): string => listing!.getDataValue('title')),
            senderName,
            senderEmail
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