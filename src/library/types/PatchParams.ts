import Id from '@/types/Id'
export default interface PatchParams extends Id {
  body: FormData | object
}