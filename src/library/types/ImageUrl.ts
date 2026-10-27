import ListingId from '@/types/ListingId'
import SqlRecord from '@/types/SqlRecord'
export default interface ImageUrl extends SqlRecord, ListingId {
  imageUrl: string
}