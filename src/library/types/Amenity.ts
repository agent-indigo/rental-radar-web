import SqlRecord from '@/types/SqlRecord'
export default interface Amenity extends SqlRecord {
  listingId: string
  amenity: string
}