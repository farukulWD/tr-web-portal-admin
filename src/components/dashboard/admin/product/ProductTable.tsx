"use client";
import { ColumnConfig } from "@/types/globalTypes";
import GlobalTable from "@/components/shared/global/GlobalTable";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";

import { Eye, Settings2, Trash2 } from "lucide-react";
import Link from "next/link";
import { IProduct } from "@/types/productType";
import {
  useDeleteProductMutation,
  useGetProductsQuery,
} from "@/redux/api/productApi";
import GlobalSkeletonTable from "@/components/shared/global/GlobalSkeletonTable";
import { GlobalAlert } from "@/components/shared/global/GlobalAlert";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button copy";
import { AlertDialogHeader } from "@/components/ui/alert-dialog";

const ProductTable = () => {
  const [text, setText] = useState("");
  const { data, isLoading, isError } = useGetProductsQuery({});
  const [deleteProduct] = useDeleteProductMutation();
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
          <div className="flex justify-between items-center w-full">
            <Link
              href={`/dashboard/admin/administration/product-management/add-product/?id=${item?._id}`}
              className="flex justify-center items-center w-full"
            >
              <Settings2 className="size-5 text-green-500 cursor-pointer" />
            </Link>
            <div className="flex justify-center items-center w-full">
              <GlobalAlert
                actionButton={
                  <Trash2 className="size-5 text-destructive cursor-pointer" />
                }
                title={
                  <div className="text-center">
                    Are you sure you want to{" "}
                    <span className="text-destructive">Deleted</span> this item
                  </div>
                }
                subTitle={
                  <>
                    If you deleted this item once tis item is not retrieve again
                  </>
                }
                continueAction={
                  <span onClick={() => deleteProduct({ _id: item?._id })}>
                    Deleted
                  </span>
                }
                continueActionClass="bg-destructive hover:bg-destructive/90"
              />
            </div>
            <div className="flex justify-center items-center w-full">
              <Dialog>
                <DialogTrigger
                  asChild
                  className="size-5 text-green-500 cursor-pointer"
                >
                  <Eye onClick={() => ProductModal()} />
                </DialogTrigger>
                {ProductModal()}
              </Dialog>
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

export const ProductModal = () => {
  return (
    <DialogContent className="sm:max-w-[425px]">
      <AlertDialogHeader>
        <DialogTitle>Edit profile</DialogTitle>
        <DialogDescription>
          Make changes to your profile here. Click save when youre done.
        </DialogDescription>
      </AlertDialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Name
          </Label>
          <Input id="name" defaultValue="Pedro Duarte" className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="username" className="text-right">
            Username
          </Label>
          <Input
            id="username"
            defaultValue="@peduarte"
            className="col-span-3"
          />
        </div>
      </div>
      <DialogFooter>
        <Button type="submit">Save changes</Button>
      </DialogFooter>
    </DialogContent>
  );
};
