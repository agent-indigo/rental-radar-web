import Pagination from '@/types/Pagination'
export default interface ListingSearchParams extends Pagination {
  street: string
  city: string
  state: string
  zip: string
  type: string
}