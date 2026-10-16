import SqlRecord from '@/types/SqlRecord'
export default  interface Inquiry extends SqlRecord {
  sender: string
  recipient: string
  listing: string
  senderName: string
  senderEmail: string
  senderPhone?: string
  body?: string
  isRead: boolean
}