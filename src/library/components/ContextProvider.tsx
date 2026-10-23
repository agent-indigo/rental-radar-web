'use client'
import {
  FunctionComponent,
  PropsWithChildren,
  ReactElement
} from 'react'
import {Provider} from 'react-redux'
import store from '@/redux/store'
import {
  setDetails,
  clearDetails
} from '@/redux/slices/userSlice'
import {useGetUserDetailsQuery} from '@/redux/slices/userApiSlice'
const ContextProvider: FunctionComponent<PropsWithChildren> = ({children}): ReactElement => {
  const {
    data,
    error
  } = useGetUserDetailsQuery(undefined)
  if (error) {
    store.dispatch(clearDetails())
  } else {
    store.dispatch(setDetails(data))
  }
  return (
    <Provider store={store}>
      {children}
    </Provider>
  )
}
export default ContextProvider