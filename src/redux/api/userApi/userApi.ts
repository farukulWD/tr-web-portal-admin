
import { baseApi } from "../baseApi";

export const userApi = baseApi.injectEndpoints({
 
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (formData) => ({
        url: "/register",
        method: "POST",
        body: formData,
      }),
     
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
