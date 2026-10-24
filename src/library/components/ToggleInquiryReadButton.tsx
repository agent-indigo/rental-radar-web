'use client'
import {
  FunctionComponent,
  MouseEvent,
  ReactElement
} from 'react'
import {toast} from 'react-toastify'
import ToggInqRdBtnProps from '@/types/ToggInqRdBtnProps'
import {useToggleInquiryReadMutation} from '@/redux/slices/inquiriesApiSlice'
const ToggleInquiryReadButton: FunctionComponent<ToggInqRdBtnProps> = ({
  id,
  isRead
}): ReactElement => {
  const [toggleInquiryRead] = useToggleInquiryReadMutation()
  return (
    <button
      onClick={async (event: MouseEvent): Promise<void> => {
        event.preventDefault()
        const {
          data,
          error
        } = await toggleInquiryRead(id)
        if (error) {
          toast.error(error.toString())
        } else {
          toast.success(`Inquiry marked as ${data?.isRead ? 'read' : 'unread'}.`)
        }
      }}
      className={`mt-4 mr-3 ${isRead ? 'bg-gray-300' : 'bg-blue-500 text-white'} py-1 px-3 rounded-md`}
    >
      Mark as {isRead ? 'unread' : 'read'}
    </button>
  )
}
export default ToggleInquiryReadButton 