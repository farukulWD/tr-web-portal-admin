import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/v1/users",
  }),
  tagTypes: ["user"],
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (formData) => ({
        url: "/register",
        method: "POST",
        body: formData,
      }),
      //   invalidatesTags: ["product"],
    }),
    getUsers: builder.query({
      query: () => ({
        url: "/get-users",
        method: "GET",
      }),
      providesTags: ["user"],
    }),
  }),
});

export const { useCreateUserMutation, useGetUsersQuery } = userApi;
