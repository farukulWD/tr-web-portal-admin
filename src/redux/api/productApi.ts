import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/v1/product",
  }),
  tagTypes: ["product"],
  endpoints: (builder) => ({
    createProduct: builder.mutation({
      query: (formData) => ({
        url: "/create",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["product"],
    }),
    getProducts: builder.query({
      query: () => ({
        url: "/get-all",
        method: "GET",
      }),
      providesTags: ["product"],
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
      invalidatesTags: ["product"],
    }),
    deleteProduct: builder.mutation({
      query: (query) => ({
        url: `/delete/${query._id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["product"],
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
