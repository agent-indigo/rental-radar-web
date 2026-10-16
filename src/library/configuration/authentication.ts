import {
  randomUUID,
  UUID
} from 'crypto'
import {betterAuth} from 'better-auth'
import {Pool} from 'pg'
import connectToSqlDb from '@/utilities/connectToSqlDb'
import userSqlModel from '@/models/userSqlModel'
const authentication = betterAuth({
  account: {
    modelName: 'accounts'
  },
  advanced: {
    database: {
      generateId: (): UUID => randomUUID()
    }
  },
  database: new Pool({
    database: process.env.SQL_DB_NAME ?? 'RentalRadar',
    user: process.env.SQL_DB_USER ?? 'postgres',
    password: process.env.SQL_DB_PW ?? '',
    host: process.env.SQL_DB_HOST ?? 'localhost',
    port: parseInt(process.env.SQL_DB_PORT ?? '5432'),
    ssl: true
  }),
  databaseHooks: {
    user: {
      create: {
        before: async (user): Promise<boolean> => {
          await connectToSqlDb()
          if (await userSqlModel.count({
            where: {
              role: 'root'
            }
          }) > 0) {
            return false
          } else {
            user.role = 'root'
            return true
          }
        }
      },
      delete: {
        before: async (user): Promise<boolean> => !(user.role === 'root')
      }
    }
  },
  session: {
    modelName: 'sessions'
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ''
    }
  },
  user: {
    additionalFields: {
      bookmarkedListings: {
        type: ['string'],
        required: true,
        defaultValue: []
      },
      role: {
        type: 'string',
        required: true,
        defaultValue: 'user',
        input: false
      }
    }
  },
  verification: {
    modelName: 'verifications'
  }
})
export default authentication