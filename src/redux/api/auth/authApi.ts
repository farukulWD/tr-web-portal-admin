import { TResponse } from "@/types";
import { baseApi } from "../baseApi";
import { TUser } from "@/types/usersType";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<
      TResponse<{
        accessToken: string;
      }>,
      any
    >({
      query: (formData) => ({
        url: "/auth/login",
        method: "POST",
        data: formData,
      }),
    }),
    getSingleUser: builder.query<TResponse<TUser>, undefined>({
      query: () => ({
        url: "/users/get-user",
        method: "GET",
      }),
    }),
  }),
});

export const { useLoginMutation, useGetSingleUserQuery } = authApi;
