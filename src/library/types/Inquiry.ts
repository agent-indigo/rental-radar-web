import SqlRecord from '@/types/SqlRecord'
export default  interface Inquiry extends SqlRecord {
  senderId: string
  recipientId: string
  listingId: string
  listingName?: string
  senderName?: string
  senderEmail?: string
  senderPhone?: string
  body?: string
  isRead: boolean
}