import authentication from '@/configuration/authentication'
import error401response from '@/httpResponses/error401response'
import error500response from '@/httpResponses/error500response'
import success200response from '@/httpResponses/success200response'
import userSqlModel from '@/models/userSqlModel'
import User from '@/types/User'
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
      const user: Model<User> | null = await userSqlModel.findByPk(session.user.id)
      return user ? success200response({
        id: user.getDataValue('id'),
        image: user.getDataValue('image')
      }) : error401response
    } else {
      return error401response
    }
  } catch (error: any) {
    return error500response(error)
  }
}