import ListingId from '@/types/ListingId'
import UserId from '@/types/UserId'
import SqlRecord from '@/types/SqlRecord'
export default interface Bookmark extends SqlRecord, ListingId, UserId {}