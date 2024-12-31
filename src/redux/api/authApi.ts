import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/v1/auth",
  }),
  tagTypes: ["auth"],
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (formData) => ({
        url: "/login",
        method: "POST",
        body: formData,
      }),
      //   invalidatesTags: ["product"],
    }),
  }),
});

export const { useLoginUserMutation } = authApi;
