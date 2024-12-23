import ProductTable from "@/components/dashboard/admin/product/ProductTable";
import React from "react";

export interface ProductData {
  code: string;
  name: string;
  price: number;
  fu: string;
  stock: number;
}
function AllProduct() {
  const data: ProductData[] = [
    {
      code: "3312",
      fu: "1 / Price",
      name: "4 Seated Deluxe Table -Print R/W Golden(P/L)-TEL",
      price: 1555,
      stock: 5,
    },
    {
      code: "2312",
      fu: "1 / Price",
      name: "4 Seated Deluxe Table-Print Black Royal (Pl/L)-TEL",
      price: 1555,
      stock: 10,
    },
  ];
  return (
    <>
      <ProductTable data={data} />
    </>
  );
}

export default AllProduct;
