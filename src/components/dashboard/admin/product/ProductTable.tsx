"use client";
import { ColumnConfig } from "@/app/types/globalTypes";
import GlobalTable from "@/components/shared/global/GlobalTable";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import { ProductData } from "./ProductList";

const ProductTable = ({ data }: { data: ProductData[] }) => {
  const [text, setText] = useState("");

  const newFilteredData = data.filter(
    (item) =>
      item.name.toLowerCase().includes(text.toLocaleLowerCase()) ||
      item.code.toLowerCase().includes(text.toLocaleLowerCase())
  );
  console.log(newFilteredData);
  const columns: ColumnConfig<ProductData>[] = [
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
