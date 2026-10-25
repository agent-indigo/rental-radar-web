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
    }),
    bookmarkListing: builder.mutation({
      query: (listingId: string) => ({
        url: `/listings/bookmarked`,
        method: 'POST',
        body: {
          listingId
        }
      }),
      invalidatesTags: [
        'listing'
      ]
    }),
    deleteBookmark: builder.mutation({
      query: (id: string) => ({
        url: `/listings/bookmarked/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: [
        'listing'
      ]
    })
  })
})
export const {
  useGetUserDetailsQuery,
  useLazyGetUserDetailsQuery,
  useBookmarkListingMutation,
  useDeleteBookmarkMutation
} = userApiSlice