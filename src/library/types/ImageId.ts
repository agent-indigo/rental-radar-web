import ListingId from '@/types/ListingId'
import SqlRecord from '@/types/SqlRecord'
export default interface ImageId extends SqlRecord, ListingId {
  imageId: string
}