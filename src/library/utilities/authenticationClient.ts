import {BetterAuthClientOptions} from 'better-auth'
import {
  createAuthClient,
  ReactAuthClient
} from 'better-auth/react'
const authenticationClient: ReactAuthClient<BetterAuthClientOptions> = createAuthClient()
export default authenticationClient