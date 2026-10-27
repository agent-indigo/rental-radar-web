import ListingId from '@/types/ListingId'
import SqlRecord from '@/types/SqlRecord'
export default interface Amenity extends SqlRecord, ListingId {
  amenity: string
}