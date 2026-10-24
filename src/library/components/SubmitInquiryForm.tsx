'use client'
import {
  FunctionComponent,
  ReactElement
} from 'react'
import {toast} from 'react-toastify'
import SubmitButton from '@/components/SubmitButton'
import {useSelector} from 'react-redux'
import {useSubmitInquiryMutation} from '@/redux/slices/inquiriesApiSlice'
import ContextProps from '@/types/ContextProps'
import User from '@/types/User'
import ComponentListing from '@/types/ComponentListing'
import Listing from '@/types/Listing'
const SubmitInquiryForm: FunctionComponent<ComponentListing> = ({listing}): ReactElement => {
  const {
    id,
    ownerId
  }: Listing = listing
  const user: User | undefined = useSelector((state: ContextProps): User | undefined => state.user.details)
  const isOwner: boolean = user?.id === ownerId
  const [submitInquiry] = useSubmitInquiryMutation()
  return (
    <>
      <h3 className='text-xl text-center font-bold py-1'>
        {user ? isOwner ? 'This is one of your listings.' : 'Inquiry Form' : 'Sign in to inquire.'}
      </h3>
      {user && !isOwner && (
        <form action={async (body: FormData): Promise<void> => {
          const {error} = await submitInquiry(body)
          if (error) {
            toast.error(error.toString())
          } else {
            toast.success('Inquiry submitted.')
          }
        }}>
          <input
            type='hidden'
            id='listingId'
            name='listingId'
            required
            readOnly
            defaultValue={id}
          />
          <input
            type='hidden'
            id='recipientId'
            name='recipientId'
            required
            readOnly
            defaultValue={ownerId}
          />
          <div className='mb-4'>
            <label
              className='block text-gray-700 text-sm font-bold mb-2'
              htmlFor='senderPhone'
            >
              Phone:
            </label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='senderPhone'
              name='senderPhone'
              type='text'
            />
          </div>
          <div className='mb-4'>
            <label
              className='block text-gray-700 text-sm font-bold mb-2'
              htmlFor='body'
            >
              Message:
            </label>
            <textarea
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 h-44 focus:outline-none focus:shadow-outline'
              id='body'
              name='body'
              required
            />
          </div>
          <div>
            <SubmitButton
              message='Submitting...'
              action='Submit Inquiry'
            />
          </div>
        </form>
      )}
    </>
  )
}
export default SubmitInquiryForm