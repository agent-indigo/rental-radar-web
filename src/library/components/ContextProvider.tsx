'use client'
import {
  FunctionComponent,
  PropsWithChildren,
  ReactElement,
  useEffect
} from 'react'
import {Provider} from 'react-redux'
import store from '@/redux/store'
import {
  setDetails,
  clearDetails
} from '@/redux/slices/userSlice'
import {useGetUserDetailsQuery} from '@/redux/slices/userApiSlice'
const ContextProvider: FunctionComponent<PropsWithChildren> = ({children}): ReactElement => {
  const response = useGetUserDetailsQuery(undefined)
  useEffect((): void => {
    if (response.isSuccess) {
      store.dispatch(setDetails(response.data))
    } else if (response.isError) {
      store.dispatch(clearDetails())
    }
  }, [response])
  return (
    <Provider store={store}>
      {children}
    </Provider>
  )
}
export default ContextProvider