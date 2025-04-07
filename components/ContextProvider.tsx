'use client'
import {
  Context,
  createContext,
  FunctionComponent,
  PropsWithChildren,
  ReactElement,
  useContext,
  useEffect,
  useState
} from 'react'
import ContextProps from '@/types/ContextProps'
import UserSqlRecord from '@/types/UserSqlRecord'
const AppContext: Context<ContextProps> = createContext<ContextProps>({})
const ContextProvider: FunctionComponent<PropsWithChildren> = ({children}): ReactElement => {
  const [
    user,
    setUser
  ] = useState<UserSqlRecord | undefined>(undefined)
  useEffect((): void => {
    const getUser: Function = async (): Promise<void> => {
      const response: Response = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/auth/user`)
      response.ok && setUser(await response.json())
    }
    getUser()
  }, [])
  return (
    <AppContext.Provider value={{
      user
    }}>
      {children}
    </AppContext.Provider>
  )
}
export const useGetContext: Function = (): ContextProps => useContext<ContextProps>(AppContext)
export default ContextProvider