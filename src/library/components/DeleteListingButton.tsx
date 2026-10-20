'use client'
import {
  FunctionComponent,
  MouseEventHandler,
  ReactElement
} from 'react'
import {toast} from 'react-toastify'
import Id from '@/types/Id'
import {useDeleteListingMutation} from '@/redux/slices/listingsApiSlice'
const DeleteListingButton: FunctionComponent<Id> = ({id}): ReactElement => {
  const [deleteListing] = useDeleteListingMutation()
  const handleDelete: MouseEventHandler = async (): Promise<void> => {
    const response = await deleteListing(id)
    const {error} = response
    if (error) {
      toast.error(error.toString())
    } else {
      toast.success('Listing deleted.')
    }
  }
  return (
    <button
      onClick={handleDelete}
      type='button'
      className='bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600'
    >
      Delete
    </button>
  )
}
export default DeleteListingButton