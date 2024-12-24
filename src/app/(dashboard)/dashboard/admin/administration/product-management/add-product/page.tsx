import { AddProductForm } from "@/components/dashboard/admin/product/AddProductForm";
import React from "react";

function AddProductPage() {
  return (
    <section className=" md:w-10/12 w-11/12 lg:w-11/12 xl:w-12/12 mx-auto p-6 bg-white rounded-lg shadow-xl">
      <AddProductForm />
    </section>
  );
}

export default AddProductPage;
