import {MiddlewareConfig} from 'next/server'
export {default} from 'next-auth/middleware'
export const config: MiddlewareConfig = {
  matcher: [
    '/profile',
    '/properties/add',
    '/properties/bookmarked',
    '/properties/my',
    '/properties/:id/edit',
    '/vehicles/add',
    '/vehicles/bookmarked',
    '/vehicles/my',
    '/vehicles/:id/edit'
  ]
}