'use client'
import {useGetUserDetailsQuery} from '@/redux/slices/userApiSlice'
import {
  clearDetails,
  setDetails
} from '@/redux/slices/userSlice'
import store from '@/redux/store'
import {
  FunctionComponent,
  useEffect
} from 'react'
const ContextManager: FunctionComponent = (): null => {
  const {
    data,
    error
  } = useGetUserDetailsQuery(null)
  useEffect((): void => {
    if (error) {
      store.dispatch(clearDetails())
    } else if (data) {
      store.dispatch(setDetails(data))
    }
  }, [
    data,
    error
  ])
  return null
}
export default ContextManager