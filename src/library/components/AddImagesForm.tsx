'use client'
import {
  FunctionComponent,
  ReactElement
} from 'react'
import {useRouter} from 'next/navigation'
import {toast} from 'react-toastify'
import {AppRouterInstance} from 'next/dist/shared/lib/app-router-context.shared-runtime'
import SubmitButton from '@/components/SubmitButton'
import {useAddImagesToListingMutation} from '@/redux/slices/listingsApiSlice'
import ComponentListing from '@/types/ComponentListing'
import Listing from '@/types/Listing'
const AddImagesForm: FunctionComponent<ComponentListing> = ({listing}): ReactElement => {
  const router: AppRouterInstance = useRouter()
  const {id}: Listing = listing
  const [addImageToListing] = useAddImagesToListingMutation()
  const handleSubmit = async (body: FormData): Promise<void> => {
    const {error} = await addImageToListing({
      id: id!,
      body
    })
    if (error) {
      toast.error(error.toString())
    } else {
      toast.success('Images added.')
      router.push(`/listings/${id}`)
    }
  }
  return (
    <form action={handleSubmit}>
      <h2 className='text-3xl text-center font-semibold mb-6'>
        Add Images
      </h2>
      <input
        type='file'
        id='files'
        name='files'
        accept='image/*'
        multiple
        required
        className='border rounded w-full py-2 px-3'
      />
      <SubmitButton
        message='Adding...'
        action='Add Images'
      />
    </form>
  )
}
export default AddImagesForm