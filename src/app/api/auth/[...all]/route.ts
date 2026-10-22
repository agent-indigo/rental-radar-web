import {toNextJsHandler} from 'better-auth/next-js'
import authentication from '@/connectors/authentication'
export const dynamic = 'force-dynamic'
export const {
  GET,
  POST
} = toNextJsHandler(authentication)