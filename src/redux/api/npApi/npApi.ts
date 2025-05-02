import { baseApi } from "../baseApi";

const npApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllNp: builder.query({
      query: () => ({
        url: "/np/all-np",
        method: "GET",
      }),
      providesTags:["np"]
    }),
    createNp: builder.mutation({
      query: (data: { np: number }) => ({
        url: "/np/create-np",
        method: "POST",
        data: data,
      }),
    }),

    updateNP: builder.mutation({
      query: ({ npId, data }: { npId: string; data: { np: number } }) => ({
        url: `/np/update-np/${npId}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags:["np"]
    }),
  }),
});

export const { useGetAllNpQuery, useCreateNpMutation, useUpdateNPMutation } =
  npApi;
