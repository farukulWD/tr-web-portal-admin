import { TResponse } from "@/types";
import { baseApi } from "../baseApi";
import { IDelivered } from "@/components/dashboard/admin/undelivered/SingleUndeliveredPage";

const deliveredApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    makeDelivered: build.mutation<TResponse<any>, {undeliveredId:string,deliveredData:IDelivered}>({
      query: ({ undeliveredId, deliveredData }) => ({
        url: `/delivered/make-delivered/${undeliveredId}`,
        method: "POST",
        data: deliveredData,
      }),
      invalidatesTags: ["single-undelivered", "undelivered"],
    }),
  }),
});

export const { useMakeDeliveredMutation } = deliveredApi;
