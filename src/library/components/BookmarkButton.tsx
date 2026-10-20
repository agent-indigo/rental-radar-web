'use client'
import {
  FunctionComponent,
  MouseEventHandler,
  ReactElement
} from 'react'
import {FaBookmark} from 'react-icons/fa'
import {toast} from 'react-toastify'
import {useSelector} from 'react-redux'
import Spinner from '@/components/Spinner'
import ContextProps from '@/types/ContextProps'
import User from '@/types/User'
import {
  useGetListingBookmarkedStatusQuery,
  useToggleListingBookmarkedMutation
} from '@/redux/slices/listingsApiSlice'
import ComponentListing from '@/types/ComponentListing'
import Listing from '@/types/Listing'
const BookmarkButton: FunctionComponent<ComponentListing> = ({listing}): ReactElement | null => {
  const {id}: Listing = listing
  const user: User | undefined = useSelector((state: ContextProps): User | undefined => state.user.details)
  const response = useGetListingBookmarkedStatusQuery(id!)
  const [toggleListingBookmarked] = useToggleListingBookmarkedMutation()
  const {
    data,
    isError,
    isLoading
  } = response
  const {isBookmarked} = data
  const buttonBg: string = isBookmarked ? 'red' : 'blue'
  const handleToggle: MouseEventHandler = async (): Promise<void> => {
    const response = await toggleListingBookmarked(id!)
    const {
      data,
      error
    } = response
    if (error) {
      toast.error(error.toString())
    } else {
      toast.success(`Bookmark ${data.isBookmarked ? 'added' : 'removed'}.`)
    }
  }
  return isLoading ? (
    <Spinner loading={isLoading}/>
  ) : isError ? (
    <h1 className='text-red-500 text-center font-bold'>
      Error checking bookmark status.
    </h1>
  ) : user && user.id === listing.ownerId ? (
    null
  ) : (
    <button
      disabled={!user}
      onClick={handleToggle}
      className={`bg-${buttonBg}-500 hover:bg-${buttonBg}-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center`}
    >
      <FaBookmark className='mr-2'/> {!user && 'Log in to '}{isBookmarked ? 'Remove Bookmark' : 'Bookmark'}
    </button>
  )
}
export default BookmarkButton