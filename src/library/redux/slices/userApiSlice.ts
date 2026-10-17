import apiSlice from '@/redux/slices/apiSlice'
const userApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getUserDetails: builder.query({
      query: () => ({
        url: '/auth/user',
        method: 'GET'
      }),
      providesTags: [
        'user'
      ]
    })
  })
})
export const {
  useGetUserDetailsQuery,
  useLazyGetUserDetailsQuery
} = userApiSlice