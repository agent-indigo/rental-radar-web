import ImageUrls from '@/types/ImageUrls'
import SqlRecord from '@/types/SqlRecord'
export default interface Listing extends SqlRecord, ImageUrls {
  ownerId: string
  title: string
  type: string
  description: string
  street: string
  city: string
  state: string
  zip: string
  beds: number
  baths: number
  sqft: number
  amenities?: string[]
  nightlyRate?: number
  weeklyRate?: number
  monthlyRate?: number
  ownerName?: string
  ownerEmail?: string
  ownerPhone?: string
  imageIds?: string[]
  isFeatured: boolean
}