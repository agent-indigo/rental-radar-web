import {User as BetterAuthUser} from 'better-auth'
export default interface User extends BetterAuthUser {
  bookmarkedListings: string[]
  role: string
}