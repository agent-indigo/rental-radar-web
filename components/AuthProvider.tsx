'use client'
import {
  FunctionComponent,
  ReactElement
} from 'react'
import {SessionProvider} from 'next-auth/react'
import Children from '@/types/Children'
const AuthProvider: FunctionComponent<Children> = ({
  children
}): ReactElement => (
  <SessionProvider>
    {children}
  </SessionProvider>
)
export default AuthProvider