"use client";
import GlobalSkeletonTable from "@/components/shared/global/GlobalSkeletonTable";
import GlobalTable from "@/components/shared/global/GlobalTable";
import { useGetAllNpQuery } from "@/redux/api/npApi/npApi";
import { ColumnConfig } from "@/types/globalTypes";
import { Pencil } from "lucide-react";
import Link from "next/link";
import React from "react";

function AllNp() {
  const { data,isLoading } = useGetAllNpQuery(undefined);
  console.log(data);
  const columns: ColumnConfig<any>[] = [
    {
      key: "np",
      label: "NP",
      align: "left",
      render:(np)=><p>{np}%</p>
    },
    {
      key: "createdBy",
      label: "Created By",
      align: "left",
      render:(createdBy)=> <p>{createdBy?.name}</p>
    },
    {
      key: "updatedBy",
      label: "Updated By",
      align: "left",
      render:(updatedBy)=> <p>{updatedBy?.name}</p>
    },

    {
          key: "action",
          label: "Action",
          align: "left",
          render: (_, row) => {
            return (
              <div>
                <div>
                  <Link href={`/dashboard/admin/administration/np-management/all-np/${row._id}?np=${row?.np}`}>
                    <Pencil  className="text-green-500"/>
                    
                  </Link>
                </div>
              </div>
            );
          },
        },
  ];
  return <div>
  <div>
    <h1 className="text-2xl font-semibold">NP</h1>
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
</div>;
}

export default AllNp;
