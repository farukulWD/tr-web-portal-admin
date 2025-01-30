"use client";

import TransactionComponents from "@/components/dashboard/admin/transactions/TransactionComponents";
import { useGetTransactionsQuery } from "@/redux/api/balanceApi/balanceApi";
import React from "react";

export default function TransactionPage() {
  const { data, isLoading } = useGetTransactionsQuery(undefined);
 
  return (
    <div>
      <div className="mb-5 ">
        <h3 className="text-2xl font-semibold">All Transacrtion Here</h3>
        <p>Track and manage your financial activity effortlessly</p>
      </div>
      <TransactionComponents isLoading={isLoading} data={data?.data || []} />
    </div>
  );
}
