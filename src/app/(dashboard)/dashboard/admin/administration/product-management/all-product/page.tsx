import { getProducts } from "@/api/productApi";
import ProductTable from "@/components/dashboard/admin/product/ProductTable";

import React from "react";

async function AllProduct() {
  const data = await getProducts();
  return (
    <>
      <ProductTable data={data} />
    </>
  );
}

export default AllProduct;
