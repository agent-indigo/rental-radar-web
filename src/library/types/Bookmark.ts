import SqlRecord from '@/types/SqlRecord'
export default interface Bookmark extends SqlRecord {
  userId: string
  listingId: string
}