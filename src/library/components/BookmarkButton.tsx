'use client'
import {
  FunctionComponent,
  MouseEvent,
  ReactElement
} from 'react'
import {FaBookmark} from 'react-icons/fa'
import {toast} from 'react-toastify'
import {useSelector} from 'react-redux'
import Spinner from '@/components/Spinner'
import ContextProps from '@/types/ContextProps'
import {
  useBookmarkListingMutation,
  useDeleteBookmarkMutation,
  useGetListingBookmarkedStatusQuery,
} from '@/redux/slices/listingsApiSlice'
import User from '@/types/User'
import ComponentListing from '@/types/ComponentListing'
import Listing from '@/types/Listing'
const BookmarkButton: FunctionComponent<ComponentListing> = ({listing}): ReactElement | null => {
  const {id}: Listing = listing
  const user: User | undefined = useSelector((state: ContextProps): User | undefined => state.user.details)
  const {
    data,
    isError,
    isFetching,
    error
  } = useGetListingBookmarkedStatusQuery(id!)
  const [bookmarkListing] = useBookmarkListingMutation()
  const [deleteBookmark] = useDeleteBookmarkMutation()
  const {isBookmarked} = data
  const buttonBg: string = isBookmarked ? 'red' : 'blue'
  return isFetching ? (
    <Spinner loading={isFetching}/>
  ) : isError ? (
    <h1 className='text-red-500 text-center font-bold'>
      {error.toString()}
    </h1>
  ) : user && user.id === listing.ownerId ? (
    null
  ) : (
    <button
      disabled={!user}
      onClick={async (event: MouseEvent): Promise<void> => {
        event.preventDefault()
        if (isBookmarked) {
          const {error} = await deleteBookmark(id!)
          if (error) {
            toast.error(error.toString())
          } else {
            toast.success('Bookmark removed.')
          }
        } else {
          const {error} = await bookmarkListing(id!)
          if (error) {
            toast.error(error.toString())
          } else {
            toast.success('Bookmark added.')
          }
        }
      }}
      className={`bg-${buttonBg}-500 hover:bg-${buttonBg}-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center`}
    >
      <FaBookmark className='mr-2'/> {!user && 'Sign in to '}{isBookmarked ? 'Remove Bookmark' : 'Bookmark'}
    </button>
  )
}
export default BookmarkButton