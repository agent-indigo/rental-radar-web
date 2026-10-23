'use client'
import {
  FunctionComponent,
  MouseEvent,
  MouseEventHandler,
  ReactElement
} from 'react'
import {FaGoogle} from 'react-icons/fa'
import authenticationClient from '@/utilities/authenticationClient'
const SignInButton: FunctionComponent = (): ReactElement => {
  const handleSignIn: MouseEventHandler = async (event: MouseEvent): Promise<void> => {
    event.preventDefault()
    await authenticationClient.signIn.social({
      provider: 'google'
    })
  }
  return (
    <button
      onClick={handleSignIn}
      className='flex items-center text-white bg-gray-700 hover:bg-gray-900 hover:text-white rounded-md px-3 py-2'
    >
      <span>
        <FaGoogle className='text-white mr-2'/>
        Sign In or Register
      </span>
    </button>
  )
}
export default SignInButton