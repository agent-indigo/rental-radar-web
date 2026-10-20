import {
  createApi,
  fetchBaseQuery
} from '@reduxjs/toolkit/query/react'
import authenticationClient from '@/utilities/authenticationClient'
const apiSlice = createApi({
  baseQuery: async (
    args,
    api,
    extra
  ) => {
    const baseQuery = fetchBaseQuery({
      baseUrl: process.env.NEXT_PUBLIC_API_DOMAIN
    })
    const result = await baseQuery(
      args,
      api,
      extra
    )
    if (result.error?.status === 401) await authenticationClient.signOut()
    return result
  },
  tagTypes: [
    'listing',
    'user'
  ],
  endpoints: () => ({})
})
export default apiSlice