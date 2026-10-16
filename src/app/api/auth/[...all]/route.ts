import {toNextJsHandler} from 'better-auth/next-js'
import authentication from '@/configuration/authentication'
export const dynamic = 'force-dynamic'
export const {
  GET,
  POST
} = toNextJsHandler(authentication)