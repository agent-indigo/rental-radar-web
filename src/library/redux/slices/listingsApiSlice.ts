import apiSlice from '@/redux/slices/apiSlice'
import DeleteImageParams from '@/types/DeleteImageParams'
import PatchParams from '@/types/PatchParams'
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
      }: PatchParams) => ({
        url: `/listings/${id}/images`,
        method: 'POST',
        body
      })
    }),
    deleteImageFromListing: builder.mutation({
      query: ({
        id,
        imageId
      }: DeleteImageParams) => ({
        url: `/listings/${id}/images/${imageId}`,
        method: 'DELETE'
      })
    }),
    toggleListingFeatured: builder.mutation({
      query: (id: string) => ({
        url: `/listings/featured/status/${id}`,
        method: 'PATCH'
      }),
      invalidatesTags: [
        'listing'
      ]
    }),
    deleteListing: builder.mutation({
      query: (id: string) => ({
        url: `/listings/${id}`,
        method: 'delete'
      })
    }),
    getListingBookmarkedStatus: builder.query({
      query: (id: string) => ({
        url: `/listings/bookmarked/${id}`,
        method: 'GET'
      }),
      providesTags: [
        'listing'
      ]
    }),
    getListingFeaturedStatus: builder.query({
      query: (id: string) => ({
        url: `/listings/featured/status/${id}`,
        method: 'GET'
      }),
      providesTags: [
        'listing'
      ]
    }),
    editListing: builder.mutation({
      query: ({
        id,
        body
      }: PatchParams) => ({
        url: `/listings/${id},
        method: 'PATCH`,
        body
      }),
      invalidatesTags: [
        'listing'
      ]
    }),
    geolocateListing: builder.query({
      query: (id: string) => ({
        url: `/listings/${id}/geolocate`,
        method: 'GET'
      }),
      providesTags: [
        'listing'
      ]
    })
  })
})
export const {
  useSubmitListingMutation,
  useAddImagesToListingMutation,
  useDeleteImageFromListingMutation,
  useToggleListingFeaturedMutation,
  useDeleteListingMutation,
  useGetListingBookmarkedStatusQuery,
  useLazyGetListingBookmarkedStatusQuery,
  useGetListingFeaturedStatusQuery,
  useLazyGetListingFeaturedStatusQuery,
  useEditListingMutation,
  useGeolocateListingQuery,
  useLazyGeolocateListingQuery
} = listingsApiSlice