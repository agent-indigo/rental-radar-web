import apiSlice from '@/redux/slices/apiSlice'
const listingsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    submitListing: builder.mutation({
      query: (body: FormData) => ({
        url: '/listings',
        method: 'POST',
        body
      })
    }),
    addImagesToListing: builder.mutation({
      query: ({
        id,
        body
      }) => ({
        url: `/listings/${id}/images`,
        method: 'POST',
        body
      })
    }),
    deleteImageFromListing: builder.mutation({
      query: ({
        id,
        imageId
      }) => ({
        url: `/listings/${id}/images/${imageId}`,
        method: 'DELETE'
      })
    }),
    toggleListingBookmarked: builder.mutation({
      query: (id: string) => ({
        url: `/listings/bookmarked/status/${id}`,
        method: 'PATCH'
      })
    }),
    toggleListingFeatured: builder.mutation({
      query: (id: string) => ({
        url: `/listings/featured/status/${id}`,
        method: 'PATCH'
      })
    }),
    deleteListing: builder.mutation({
      query: (id: string) => ({
        url: `/listings/${id}`,
        method: 'delete'
      })
    })
  })
})
export const {
  useSubmitListingMutation,
  useAddImagesToListingMutation,
  useDeleteImageFromListingMutation,
  useToggleListingBookmarkedMutation,
  useToggleListingFeaturedMutation,
  useDeleteListingMutation
} = listingsApiSlice