import Pagination from '@/types/Pagination'
export default interface ListingSearchParams extends Pagination {
  keywords?: string
  type: string
}