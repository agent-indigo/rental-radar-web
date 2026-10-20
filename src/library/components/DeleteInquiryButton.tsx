'use client'
import {
  FunctionComponent,
  MouseEventHandler,
  ReactElement
} from 'react'
import {toast} from 'react-toastify'
import {useDeleteInquiryMutation} from '@/redux/slices/inquiriesApiSlice'
import DestructuredId from '@/types/DestructuredId'
const DeleteInquiryButton: FunctionComponent<DestructuredId> = ({id}): ReactElement => {
  const [deleteInquiry] = useDeleteInquiryMutation()
  const handleDelete: MouseEventHandler = async (): Promise<void> => {
    const response = await deleteInquiry(id)
    const {error} = response
    if (error) {
      toast.error(error.toString())
    } else {
      toast.success('Inquiry deleted.')
    }
  }
  return (
    <button
      onClick={handleDelete}
      className='mt-4 bg-red-500 text-white py-1 px-3 rounded-md'
    >
      Delete
    </button>
  )
}
export default DeleteInquiryButton