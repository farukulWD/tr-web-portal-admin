"use client";

import GlobalSkeletonTable from "@/components/shared/global/GlobalSkeletonTable";
import GlobalTable from "@/components/shared/global/GlobalTable";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useGetAllUndeliveredQuery } from "@/redux/api/doApi/doApi";
import { ColumnConfig } from "@/types/globalTypes";
import { EyeIcon } from "lucide-react";
import Link from "next/link";
import { use, useEffect, useState } from "react";

function AllUndeliveredComponent() {
  const { data, isLoading } = useGetAllUndeliveredQuery(undefined);
  const [inputValue, setInputValue] = useState<string>("");
  const [filteredData, setFilteredData] = useState<any[]>([]);

  const handleSearch = (value: string) => {
    setInputValue(value);

    if (value.length > 0) {
      const filteredData = data?.data.filter((item: any) =>
        item?.dealer?.code.toString().includes(value)
      );
      setFilteredData(filteredData);
    } else {
      setFilteredData(data?.data);
    }
  };

  useEffect(() => {
    setFilteredData(data?.data);
  }, [data?.data]);

  const columns: ColumnConfig<any>[] = [
    {
      key: "dealer",
      label: "Dealer Code",
      align: "left",
      render: (_, row) => {
        return row?.dealer?.code;
      },
    },
    {
      key: "dealer",
      label: "Dealer",
      align: "left",
      render: (_, row) => {
        return row?.dealer?.shopName;
      },
    },
    {
      key: "group",
      label: "Group",
      align: "left",
      render: (_, row) => {
        return row?.dealer?.group;
      },
    },
    {
      key: "mobile",
      label: "Mobile",
      align: "left",
      render: (_, row) => {
        return row?.dealer?.mobile;
      },
    },
    {
      key: "totalUndeliveredAmount",
      label: "Total Amount",
      align: "left",
    },
    {
      key: "updatedAt",
      label: "Last Updated",
      align: "left",
      render: (_, row) => {
        return new Date(row?.updatedAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        });
      },
    },
    {
      key: "action",
      label: "Action",
      align: "left",
      render: (_, row) => {
        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href={`/dashboard/admin/administration/undelivered-management/all-undelivered/${row._id}`}>
                  <EyeIcon className="h-5 w-5 text-green-500" />
                </Link>
              </TooltipTrigger>
              <TooltipContent>View undelivered order</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      },
    },
  ];
  return (
    <div className="flex flex-col gap-2 p-2">
      <div>
        <h1 className="text-2xl font-semibold">All Undelivered</h1>
      </div>
      <div>
        <div>
          <Input
            type="number"
            placeholder="Type Dealer code"
            value={inputValue}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
      </div>
      <div>
        <div>
          {isLoading ? (
            <GlobalSkeletonTable />
          ) : (
            <>
              {data?.data && filteredData && (
                <GlobalTable columns={columns} data={filteredData} />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default AllUndeliveredComponent;
