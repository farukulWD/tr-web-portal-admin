import { TResponse } from "@/types";
import { baseApi } from "../baseApi";
import { TAddBalanceType } from "@/components/dealer/AllDealerComponents";
import { TBalace } from "@/types/balance";

const balanceApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addBalance: build.mutation<TResponse<TBalace[]>, TAddBalanceType>({
      query: (balanceData) => ({
        url: "/balance/add-balance",
        method: "POST",
        data: balanceData,
      }),
      invalidatesTags:["dealer"]
    }),
    getTransactions:build.query<TResponse<TBalace[]>,undefined>({
        query:()=>({
            url:"/balance/get-balances",
            method:"GET",

        })
    })
  }),
});



export const {useAddBalanceMutation,useGetTransactionsQuery}=balanceApi