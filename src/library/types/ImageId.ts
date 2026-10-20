import SqlRecord from '@/types/SqlRecord'
export default interface ImageId extends SqlRecord {
  listingId: string
  imageId: string
}