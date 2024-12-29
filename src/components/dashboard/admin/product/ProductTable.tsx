"use client";
import { ColumnConfig } from "@/types/globalTypes";
import GlobalTable from "@/components/shared/global/GlobalTable";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";

import { Settings2, Trash2 } from "lucide-react";
import Link from "next/link";
import { IProduct } from "@/types/productType";
import { useGetProductsQuery } from "@/redux/api/productApi";
import GlobalSkeletonTable from "@/components/shared/global/GlobalSkeletonTable";

const ProductTable = () => {
  const [text, setText] = useState("");
  const { data, isLoading, isError } = useGetProductsQuery({});

  // if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading products</p>;

  const products: IProduct[] = data?.data; // Extracting the products array from `data`

  const filteredData = products?.filter(
    (item) =>
      item.name.toLowerCase().includes(text.toLowerCase()) ||
      item.productCode.toLowerCase().includes(text.toLowerCase())
  );

  const columns: ColumnConfig<IProduct>[] = [
    {
      key: "productCode",
      label: "Code",
      align: "center",
    },
    {
      key: "name",
      label: "Name",
      align: "center",
      width: "w-1/4",
    },
    {
      key: "price",
      label: "Price",
      align: "center",
    },
    {
      key: "stock",
      label: "Stock",
      align: "center",
    },
    {
      key: "actions",
      label: "Actions",
      align: "center",
      render: (_, item) => {
        return (
          <div className="flex justify-center items-center w-full">
            <Link
              href={`/dashboard/admin/administration/product-management/add-product/?id=${item?._id}`}
              className="flex justify-center items-center w-full"
            >
              <Settings2 className="size-5 text-green-500 cursor-pointer" />
            </Link>
            <div className="flex justify-center items-center w-full">
              <Trash2 className="size-5 text-destructive cursor-pointer" />
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <div>
        <Label htmlFor="search">Search</Label>
        <Input
          placeholder="Search your Product"
          name="search"
          id="search"
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      {isLoading ? (
        <GlobalSkeletonTable />
      ) : (
        <GlobalTable columns={columns} data={filteredData} />
      )}
    </>
  );
};

export default ProductTable;
