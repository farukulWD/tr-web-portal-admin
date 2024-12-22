import { AddProductForm } from "@/components/dashboard/admin/product/AddProductForm";
import React from "react";

function AddProductPage() {
  return (
    <section className=" md:w-8/12 w-11/12 lg:w-5/12 mx-auto p-6 bg-white rounded-lg shadow-xl">
      <AddProductForm />
    </section>
  );
}

export default AddProductPage;
