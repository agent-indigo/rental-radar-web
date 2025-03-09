'use client'
import {
  Context,
  createContext,
  FunctionComponent,
  ReactElement,
  useContext,
  useEffect,
  useState
} from "react"
import State from "@/types/State"
import Children from "@/types/Children"
import UserSqlRecord from "@/types/UserSqlRecord"
const GlobalContext: Context<State> = createContext<State>({})
const GlobalContextProvider: FunctionComponent<Children> = ({children}): ReactElement => {
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
    <GlobalContext.Provider value={{
      user
    }}>
      {children}
    </GlobalContext.Provider>
  )
}
export const useGlobalContext: Function = (): State => useContext<State>(GlobalContext)
export default GlobalContextProvider