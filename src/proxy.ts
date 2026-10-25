import authentication from '@/connectors/authentication'
import {
  NextProxy,
  NextRequest,
  NextResponse,
  ProxyConfig
} from 'next/server'
export const proxy: NextProxy = async (request: NextRequest): Promise<NextResponse> => await authentication.api.getSession({
  headers: request.headers
}) ? NextResponse.next() : NextResponse.redirect(new URL(
  '/',
  request.url
))
export const config: ProxyConfig = {
  matcher: [
    '/inquiries',
    '/listings/add',
    '/listings/my',
    '/listings/:id/edit',
    '/listings/:id/images/add',
    '/listings/:id/images/delete'
  ]
}