import Id from '@/types/Id'
export default interface SqlRecord extends Id {
  createdAt?: Date
  updatedAt?: Date
}