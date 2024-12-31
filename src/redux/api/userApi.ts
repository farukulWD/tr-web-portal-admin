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
    getProducts: builder.query({
      query: () => ({
        url: "/get-all",
        method: "GET",
      }),
      //   providesTags: ["product"],
    }),
    getProductsById: builder.query({
      query: (query: { _id: string | null }) => ({
        url: `/get-single/${query._id}`,
        method: "GET",
      }),
    }),
    updatedProduct: builder.mutation({
      query: (query) => ({
        url: `/update/${query._id}`,
        method: "PATCH",
        body: query?.body,
      }),
      //   invalidatesTags: ["product"],
    }),
    deleteProduct: builder.mutation({
      query: (query) => ({
        url: `/delete/${query._id}`,
        method: "DELETE",
      }),
      //   invalidatesTags: ["product"],
    }),
  }),
});

export const {
  useCreateUserMutation,
  useGetProductsQuery,
  useGetProductsByIdQuery,
  useUpdatedProductMutation,
  useDeleteProductMutation,
} = userApi;
