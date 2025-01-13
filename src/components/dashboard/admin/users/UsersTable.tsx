"use client";
import { ColumnConfig } from "@/types/globalTypes";
import GlobalTable from "@/components/shared/global/GlobalTable";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Eye, Settings2, Trash2 } from "lucide-react";
import Link from "next/link";

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

import { AlertDialogHeader } from "@/components/ui/alert-dialog";
import { useGetUsersQuery } from "@/redux/api/userApi/userApi";
import { TUser } from "@/types/usersType";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UpdateIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const UsersTable = () => {
  const { data, isError, isLoading } = useGetUsersQuery(undefined);

  if (isError) return <p>Error loading products</p>;

  const users = data?.data || [];

  const columns: ColumnConfig<TUser>[] = [
    {
      key: "name",
      label: "Name",
      align: "center",
    },
    {
      key: "mobile",
      label: "Mobile",
      align: "center",
      width: "w-1/4",
    },
    {
      key: "role",
      label: "Role",
      align: "center",
    },
    {
      key: "status",

      label: "Status",
      align: "center",
    },
    {
      key: "isDeleted",

      label: "isDeleted",
      align: "center",
      render: (value) => {
        return <div>{value ? "True" : "False"}</div>;
      },
    },
    {
      key: "kyc",

      label: "KYC",
      align: "center",
      render: (value) => {
        return <div>{value ? "True" : "False"}</div>;
      },
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

            <DropdownMenu>
              <DropdownMenuTrigger>
                <UpdateIcon />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Link
                    href={
                      `/dashboard/admin/administration/user-management/make-dealer/${item?._id}`
                    }
                  >
                    Daaler
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={()=>toast.info("Coming soon")}>Sr</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

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
                  <>
                    {/* <span onClick={() => deleteProduct({ _id: item?._id })}>
                    Deleted
                  </span> */}
                  </>
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
                  <Eye onClick={() => UsersModal()} />
                </DialogTrigger>
                {UsersModal()}
              </Dialog>
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <div className="mb-5">
        <Input
          placeholder="Search"
          name="search"
          id="search"
          //   onChange={(e) => setText(e.target.value)}
        />
      </div>
      {isLoading ? (
        <GlobalSkeletonTable />
      ) : (
        <GlobalTable columns={columns} data={users} />
      )}
    </>
  );
};

export default UsersTable;

export const UsersModal = () => {
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

export const UsersEditForm = () => {};
