'use client'
import {
  FunctionComponent,
  PropsWithChildren,
  ReactElement
} from 'react'
import {Provider} from 'react-redux'
import store from '@/redux/store'
const ContextProvider: FunctionComponent<PropsWithChildren> = ({children}): ReactElement => (
  <Provider store={store}>
    {children}
  </Provider>
)
export default ContextProvider