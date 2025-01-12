
import { axiosBaseQuery } from '@/helpers/axiosBaseQuery'
import { createApi } from '@reduxjs/toolkit/query/react'

export const baseApi=createApi({
    reducerPath:'baseApi',
    baseQuery:axiosBaseQuery(), 
    endpoints: () => ({}),
    tagTypes:["auth","product","user","dealer"]
})