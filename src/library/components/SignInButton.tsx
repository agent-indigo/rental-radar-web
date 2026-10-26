'use client'
import {
  FunctionComponent,
  MouseEvent,
  ReactElement
} from 'react'
import {FaGoogle} from 'react-icons/fa'
import authenticationClient from '@/utilities/authenticationClient'
const SignInButton: FunctionComponent = (): ReactElement => (
  <button
    onClick={async (event: MouseEvent): Promise<void> => {
      event.preventDefault()
      await authenticationClient.signIn.social({
        provider: 'google'
      })
    }}
    className='flex items-center text-white bg-gray-700 hover:bg-gray-900 hover:text-white rounded-md px-3 py-2'
  >
    <FaGoogle className='text-white mr-2'/>
    <span>
      Sign In or Register
    </span>
  </button>
)
export default SignInButton