"use client";
import { ColumnConfig } from "@/app/types/globalTypes";
import GlobalTable from "@/components/shared/global/GlobalTable";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";

import { Settings2, Trash2 } from "lucide-react";
import Link from "next/link";
import { ProductData } from "@/app/(dashboard)/dashboard/admin/administration/product-management/all-product/page";

const ProductTable = ({ data }: { data: ProductData[] }) => {
  const [text, setText] = useState("");

  const newFilteredData = data.filter(
    (item) =>
      item.name.toLowerCase().includes(text.toLocaleLowerCase()) ||
      item.code.toLowerCase().includes(text.toLocaleLowerCase())
  );

  const columns: ColumnConfig<ProductData, ProductData[]>[] = [
    {
      key: "code",
      label: "Code",
      align: "center",
    },
    {
      key: "name",
      label: "Name",
      align: "center",
    },
    {
      key: "price",
      label: "Price",
      align: "center",
    },
    {
      key: "fu",
      label: "F/U",
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
      render: (value, item) => {
        return (
          <div className="flex justify-center items-center w-full">
            <Link
              href={`/dashboard/admin/administration/product-management/add-product/?id:${item?.code}`}
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
      <GlobalTable columns={columns} data={newFilteredData} />;
    </>
  );
};

export default ProductTable;
