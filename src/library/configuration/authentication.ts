import {
  randomUUID,
  UUID
} from 'crypto'
import {betterAuth} from 'better-auth'
import {Pool} from 'pg'
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
    port: parseInt(process.env.SQL_DB_PORT ?? '5432')
  }),
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