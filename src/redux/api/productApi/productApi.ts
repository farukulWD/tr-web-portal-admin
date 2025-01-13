import { TProduct, TResponse } from "@/types";
import { baseApi } from "../baseApi";

export const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createProduct: builder.mutation({
      query: (formData) => ({
        url: "/product/create",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["product"],
    }),
    getProducts: builder.query<TResponse<TProduct[]>, undefined>({
      query: () => ({
        url: "/product/get-all",
        method: "GET",
      }),
      providesTags: ["product"],
    }),
    getProductsById: builder.query<TResponse<TProduct>, { _id: string }>({
      query: (query: { _id: string}) => ({
        url: `/product/get-single/${query._id}`,
        method: "GET",
      }),
    }),
    updatedProduct: builder.mutation<TResponse<TProduct>,{productId:string,productData:Partial<TProduct>} >({
      query: ({productId,productData}) => ({
        url: `/product/update/${productId}`,
        method: "PATCH",
        data: productData,
      }),
      invalidatesTags: ["product"],
    }),
    deleteProduct: builder.mutation({
      query: (query) => ({
        url: `/product/delete/${query._id}`,
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
