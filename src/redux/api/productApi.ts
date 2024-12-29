import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/v1/product",
  }),
  endpoints: (builder) => ({
    createProduct: builder.mutation({
      query: (formData) => ({
        url: "/create",
        method: "POST",
        body: formData,
      }),
    }),
    getProducts: builder.query({
      query: () => ({
        url: "/get-all",
        method: "GET",
      }),
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
    }),
    deleteProduct: builder.mutation({
      query: (query) => ({
        url: `/update/${query._id}`,
        method: "D",
      }),
    }),
  }),
});

export const {
  useCreateProductMutation,
  useGetProductsQuery,
  useGetProductsByIdQuery,
  useUpdatedProductMutation,
  useDeleteProductMutation,
} = productApi;