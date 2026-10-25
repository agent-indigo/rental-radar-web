import {
  randomUUID,
  UUID
} from 'crypto'
import {betterAuth} from 'better-auth'
import {admin} from 'better-auth/plugins'
import {nextCookies} from 'better-auth/next-js'
import {Pool} from 'pg'
const authentication = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,
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
  plugins: [
    admin(),
    nextCookies()
  ],
  secret: process.env.BETTER_AUTH_SECRET,
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ''
    }
  }
})
export default authentication