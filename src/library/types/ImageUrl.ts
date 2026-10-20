import SqlRecord from '@/types/SqlRecord'
export default interface ImageUrl extends SqlRecord {
  listingId: string
  imageUrl: string
}