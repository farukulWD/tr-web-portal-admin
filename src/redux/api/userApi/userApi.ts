import { baseApi } from "../baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (formData) => {
        return {
          url: "/users/register",
          method: "POST",
          data: formData,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        };
      },
    }),
    getUsers: builder.query({
      query: () => ({
        url: "/get-users",
        method: "GET",
      }),
      providesTags: ["user"],
    }),
  }),
  overrideExisting: true,
});

export const { useCreateUserMutation, useGetUsersQuery } = userApi;
