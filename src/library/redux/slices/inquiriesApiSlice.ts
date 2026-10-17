import apiSlice from '@/redux/slices/apiSlice'
const inquriesApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    submitInquiry: builder.mutation({
      query: (body: FormData) => ({
        url: '/inquries',
        method: 'POST',
        body
      })
    }),
    toggleInquiryRead: builder.mutation({
      query: (id: string) => ({
        url: `/inquiries/${id}`,
        method: 'PATCH'
      }),
      invalidatesTags: [
        'user'
      ]
    }),
    deleteInquiry: builder.mutation({
      query: (id: string) => ({
        url: `/inquiries/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: [
        'user'
      ]
    })
  })
})
export const {
  useSubmitInquiryMutation,
  useToggleInquiryReadMutation,
  useDeleteInquiryMutation
} = inquriesApiSlice