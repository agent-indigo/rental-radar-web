'use client'
import {
  FunctionComponent,
  ReactElement
} from 'react'
import {FaGoogle} from 'react-icons/fa'
import authenticationClient from '@/utilities/authenticationClient'
const SignInButton: FunctionComponent = (): ReactElement => (
  <button
    onClick={async () => await authenticationClient.signIn.social({
      provider: 'google'
    })}
    className='flex items-center text-white bg-gray-700 hover:bg-gray-900 hover:text-white rounded-md px-3 py-2'
  >
    <span>
      <FaGoogle className='text-white mr-2'/>
      Sign in or register
    </span>
  </button>
)
export default SignInButton