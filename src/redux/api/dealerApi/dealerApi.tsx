import { baseApi } from "../baseApi";

export const dealerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createDeler: builder.mutation({
      query: (formData) => {
        return {
          url: "/dealer/create-dealer",
          method: "POST",
          data: formData,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        };
      },
    }),
    getDealers: builder.query({
      query: () => ({
        url: "/users/get-users",
        method: "GET",
      }),
      providesTags: ["dealer"],
    }),
  }),
  overrideExisting: true,
});

export const {  useCreateDelerMutation,useGetDealersQuery} = dealerApi;
