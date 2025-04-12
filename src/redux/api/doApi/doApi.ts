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
      invalidatesTags: ["do"],
    }),
  }),
});

export const {
  useGetAllDoQuery,
  useGetSingleDoQuery,
  useApprovedOrderMutation,
} = doApi;
