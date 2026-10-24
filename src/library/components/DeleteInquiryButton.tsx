'use client'
import {
  FunctionComponent,
  MouseEvent,
  ReactElement
} from 'react'
import {toast} from 'react-toastify'
import {useDeleteInquiryMutation} from '@/redux/slices/inquiriesApiSlice'
import Id from '@/types/Id'
const DeleteInquiryButton: FunctionComponent<Id> = ({id}): ReactElement => {
  const [deleteInquiry] = useDeleteInquiryMutation()
  return (
    <button
      onClick={async (event: MouseEvent): Promise<void> => {
        event.preventDefault()
        const {error} = await deleteInquiry(id)
        if (error) {
          toast.error(error.toString())
        } else {
          toast.success('Inquiry deleted.')
        }
      }}
      className='mt-4 bg-red-500 text-white py-1 px-3 rounded-md'
    >
      Delete
    </button>
  )
}
export default DeleteInquiryButton