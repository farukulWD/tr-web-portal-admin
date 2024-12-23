import React from "react";
import ProductTable from "./ProductTable";

export interface ProductData {
  code: string;
  name: string;
  price: number;
  fu: string;
  stock: number;
}
function ProductList() {
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

export default ProductList;
