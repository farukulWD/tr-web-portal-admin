"use client";
import GlobalSkeletonTable from "@/components/shared/global/GlobalSkeletonTable";
import GlobalTable from "@/components/shared/global/GlobalTable";
import { Tooltip } from "@/components/ui/tooltip";
import { useGetAllDoQuery } from "@/redux/api/doApi/doApi";
import { ColumnConfig } from "@/types/globalTypes";
import { EyeIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

function AllOrderComponent() {
  const { data, isLoading } = useGetAllDoQuery(undefined);

  const columns: ColumnConfig<any>[] = [
    {
      key: "orderCode",
      label: "Order ID",
      align: "left",
    },
    {
      key: "createdAt",
      label: "Date",
      align: "left",
      render: (_, row) => {
        return new Date(row?.createdAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        });
      },
    },
    {
      key: "dealerName",
      label: "Dealer Name",
      align: "left",
      render: (_, row) => {
        return row?.dealer?.shopName;
      },
    },
    {
      key: "dealerCode",
      label: "Dealer Code",
      align: "left",
      render: (_, row) => {
        return row?.dealer?.code;
      },
    },
    {
      key: "status",
      label: "Status",
      align: "left",
    },
    {
      key: "total",
      label: "Total Amount",
      align: "left",
    },
    {
      key: "action",
      label: "Action",
      align: "left",
      render: (_, row) => {
        return (
          <div>
            <div>
              <Link href={`/dashboard/admin/administration/order-management/all-order/${row._id}`}>
                <EyeIcon  className="text-green-500"/>
                
              </Link>
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div>
      <div>
        <h1 className="text-2xl font-semibold">All Order</h1>
      </div>
      <div>
        <div>
          {isLoading ? (
            <GlobalSkeletonTable />
          ) : (
            <>
              {data?.data && (
                <GlobalTable columns={columns} data={data?.data} />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default AllOrderComponent;
