import GlobalSkeletonTable from "@/components/shared/global/GlobalSkeletonTable";
import GlobalTable from "@/components/shared/global/GlobalTable";
import { TBalace } from "@/types/balance";
import { ColumnConfig } from "@/types/globalTypes";
import React from "react";
import dayjs from "dayjs"

function TransactionComponents({
  data,
  isLoading,
}: {
  data: TBalace[];
  isLoading: boolean;
}) {

    console.log(data)
  const columns: ColumnConfig<TBalace>[] = [
    {
      key: "amount",
      label: "Amount",
      align: "center",
    },
    {
      key: "dealer",
      label: "Dealer",
      align: "center",
      width: "w-1/4",
      render:(dealer)=><span>{dealer?.shopName}</span>
    },
    {
      key: "senderBank",
      label: "Sender Bank",
      align: "center",
    },
    {
      key: "receivedBank",
      label: "Received Bank",
      align: "center",
    },
    {
      key: "createdAt",
      label: "Added Date",
      align: "center",
      render:(value)=><span>{dayjs(value).format("DD-MM-YYYY hh:mm A")}</span>
    },
   
    
  ];
  return (
    <div>
      {isLoading ? (
        <GlobalSkeletonTable />
      ) : (
        <GlobalTable columns={columns} data={data} />
      )}
    </div>
  );
}

export default TransactionComponents;
