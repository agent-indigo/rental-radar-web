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
      })
    }),
    deleteInquiry: builder.mutation({
      query: (id: string) => ({
        url: `/inquiries/${id}`,
        method: 'DELETE'
      })
    })
  })
})
export const {
  useSubmitInquiryMutation,
  useToggleInquiryReadMutation,
  useDeleteInquiryMutation
} = inquriesApiSlice