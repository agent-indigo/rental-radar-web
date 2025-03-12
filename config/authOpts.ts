import {
  AuthOptions,
  Session
} from 'next-auth'
import {Model} from 'sequelize'
import userSqlModel from '@/models/userSqlModel'
import SignInParams from '@/types/SignInParams'
import connectToSqlDb from '@/utilities/connectToSqlDb'
import Google, {GoogleProfile} from 'next-auth/providers/google'
import SessionParams from '@/types/SessionParams'
import UserSqlRecord from '@/types/UserSqlRecord'
const authOpts: AuthOptions = {
  providers: [
    Google<GoogleProfile>({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code'
        }
      }
    })
  ],
  callbacks: {
    signIn: async (params: SignInParams): Promise<boolean> => {
      const {profile}: any = params
      await connectToSqlDb()
      const user: Model<UserSqlRecord> | null = await userSqlModel.findOne({
        where: {
          email: profile?.email
        }
      })
      if (user) {
        if (user.get('image') !== profile.picture) {
          user.set(
            'image',
            profile?.picture
          )
          await user.save()
        }
      } else {
        await userSqlModel.create({
          email: profile?.email ?? '',
          username: profile?.name ?? '',
          image: profile?.picture,
          role: await userSqlModel.findOne({
            where: {
              role: 'root'
            }
          }) ? 'user' : 'root',
          advertisedEstates: [],
          advertisedVehicles: [],
          bookmarkedEstates: [],
          bookmarkedVehicles: [],
          invoices: [],
          payments: []
        })
      }
      return true
    },
    session: async (params: SessionParams): Promise<Session> => params.session
  }
}
export default authOpts