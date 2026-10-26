'use client'
import {
  FunctionComponent,
  MouseEvent,
  ReactElement
} from 'react'
import {FaBookmark} from 'react-icons/fa'
import {toast} from 'react-toastify'
import Spinner from '@/components/Spinner'
import {
  useBookmarkListingMutation,
  useDeleteBookmarkMutation,
  useGetListingBookmarkedStatusQuery,
} from '@/redux/slices/listingsApiSlice'
import ListingActionProps from '@/types/ListingActionProps'
import Listing from '@/types/Listing'
const BookmarkButton: FunctionComponent<ListingActionProps> = ({
  listing,
  userId
}): ReactElement | null => {
  const {id}: Listing = listing
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
  ) : userId === listing.ownerId ? (
    null
  ) : (
    <button
      disabled={!userId}
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
      <FaBookmark className='mr-2'/> {!userId && 'Sign in to '}{isBookmarked ? 'Remove Bookmark' : 'Bookmark'}
    </button>
  )
}
export default BookmarkButton