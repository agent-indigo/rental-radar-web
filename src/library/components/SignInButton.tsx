'use client'
import {
  FunctionComponent,
  MouseEvent,
  MouseEventHandler,
  ReactElement
} from 'react'
import {FaGoogle} from 'react-icons/fa'
import {toast} from 'react-toastify'
import authenticationClient from '@/utilities/authenticationClient'
import {useLazyGetUserDetailsQuery} from '@/redux/slices/userApiSlice'
import {
  setDetails,
  clearDetails
} from '@/redux/slices/userSlice'
import store from '@/redux/store'
const SignInButton: FunctionComponent = (): ReactElement => {
  const [getUserDetails] = useLazyGetUserDetailsQuery()
  const handleSignIn: MouseEventHandler = async (event: MouseEvent): Promise<void> => {
    event.preventDefault()
    await authenticationClient.signIn.social({
      provider: 'google'
    })
    const {
      data,
      error
    } = await getUserDetails(null)
    if (error) {
      store.dispatch(clearDetails())
      toast.error(error.toString())
    } else {
      store.dispatch(setDetails(data))
    }
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