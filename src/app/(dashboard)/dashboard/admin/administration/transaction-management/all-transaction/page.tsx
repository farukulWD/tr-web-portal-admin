"use client"

import { useGetTransactionsQuery } from '@/redux/api/balanceApi/balanceApi'
import React from 'react'

export default function TransactionPage() {
    const {data}=useGetTransactionsQuery(undefined)
    console.log(data?.data)
  return (
    <div>
      
    </div>
  )
}
