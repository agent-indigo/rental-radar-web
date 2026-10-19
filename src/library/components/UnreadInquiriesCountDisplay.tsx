import {
  FunctionComponent,
  ReactElement
} from 'react'
import UnreadInquiriesCount from '@/types/UnreadInquiriesCount'
const UnreadInquiriesCountDisplay: FunctionComponent<UnreadInquiriesCount> = ({unreadInquiriesCount}): ReactElement | null => unreadInquiriesCount && unreadInquiriesCount > 0 ? (
  <span className='absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full'>
    {unreadInquiriesCount}
  </span>
) : null
export default UnreadInquiriesCountDisplay