import ListingId from '@/types/ListingId'
import SqlRecord from '@/types/SqlRecord'
export default  interface Inquiry extends SqlRecord, ListingId {
  senderId: string
  recipientId: string
  listingTitle?: string
  senderName?: string
  senderEmail?: string
  senderPhone?: string
  body?: string
  isRead: boolean
}