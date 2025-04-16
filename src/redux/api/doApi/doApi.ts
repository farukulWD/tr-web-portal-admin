import { baseApi } from "../baseApi";

const doApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllDo: builder.query({
      query: () => ({
        url: "/do/get-all-do",
        method: "GET",
      }),
      providesTags: ["do"],
    }),
    getSingleDo: builder.query({
      query: (id) => ({
        url: `/do/get-single-do/${id}`,
        method: "GET",
      }),
      providesTags: ["do"],
    }),
    approvedOrder: builder.mutation({
      query: (id) => ({
        url: `/do/approved-do/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["do", "undelivered"],
    }),
    rejectOrder: builder.mutation({
      query: (id) => ({
        url: `/do/reject-do/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["do", "undelivered"],
    }),
    getAllUndelivered: builder.query({
      query: () => ({
        url: `/do/get-all-undelivered-products`,
        method: "GET",
      }),
      providesTags: ["undelivered"],
    }),
    singleUndelivered: builder.query({
      query: (id) => ({
        url: `/do/get-single-undelivered-products/${id}`,
        method: "GET",
      }),
      providesTags: ["single-undelivered"],
    }),
  }),
});

export const {
  useGetAllDoQuery,
  useGetSingleDoQuery,
  useApprovedOrderMutation,
  useRejectOrderMutation,
  useGetAllUndeliveredQuery,
  useSingleUndeliveredQuery,

} = doApi;
