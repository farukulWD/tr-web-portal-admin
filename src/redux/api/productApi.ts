// src/redux/api/productApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/v1" }),
  endpoints: (builder) => ({
    createProduct: builder.mutation({
      query: (formData) => ({
        url: "/product/create",
        method: "POST",
        body: formData,
      }),
    }),
    // other endpoints...
  }),
});

export const { useCreateProductMutation } = productApi;
