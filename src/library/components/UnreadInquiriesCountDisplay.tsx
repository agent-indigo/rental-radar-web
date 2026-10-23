'use client'
import {
  FunctionComponent,
  ReactElement
} from 'react'
import {useSelector} from 'react-redux'
import ContextProps from '@/types/ContextProps'
import User from '@/types/User'
const UnreadInquiriesCountDisplay: FunctionComponent = (): ReactElement | null => {
  const user: User | undefined = useSelector((state: ContextProps): User | undefined => state.user.details)
  return user && user.unreadInquiriesCount > 0 ? (
    <span className='absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full'>
      {user.unreadInquiriesCount}
    </span>
  ) : null
}
export default UnreadInquiriesCountDisplay