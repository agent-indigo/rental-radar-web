import SqlRecord from '@/types/SqlRecord'
export default interface UserSqlRecord extends SqlRecord {
  email: string
  username: string
  image?: string
  role: 'admin' | 'dev' | 'root' | 'user'
  advertisedEstates: string[]
  advertisedVehicles: string[]
  bookmarkedEstates: string[]
  bookmarkedVehicles: string[]
  invoices: string[]
  payments: string[]
}