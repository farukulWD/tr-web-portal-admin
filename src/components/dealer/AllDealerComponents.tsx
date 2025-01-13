"use client";
import { useGetDealersQuery } from "@/redux/api/dealerApi/dealerApi";
import React from "react";
import GlobalSkeletonTable from "../shared/global/GlobalSkeletonTable";
import GlobalTable from "../shared/global/GlobalTable";
import { ColumnConfig } from "@/types/globalTypes";
import { TDealer } from "@/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { PlusCircledIcon, UpdateIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from "../ui/dialog";
import { AlertDialogHeader } from "../ui/alert-dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

function AllDealerComponents() {
  const { data, isLoading } = useGetDealersQuery(undefined);

  const columns: ColumnConfig<TDealer>[] = [
    {
      key: "shopName",
      label: "Name",
      align: "center",
    },
    {
      key: "code",
      label: "Code",
      align: "center",
    },
    {
      key: "code",
      label: "Code",
      align: "center",
    },
    {
      key: "group",
      label: "Group",
      align: "center",
    },
    {
      key: "money",
      label: "Balance",
      align: "center",
    },
    {
      key: "mobile",
      label: "Mobile",
      align: "center",
    },
    {
      key: "actions",
      label: "Actions",
      align: "left",
      render: (_, item) => {
        return (
          <div className="flex items-center">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <UpdateIcon  />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem className="cursor-pointer">
                  <strong>Deactive</strong>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer" >
                  <strong>Active</strong>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="flex justify-center items-center w-full">
              <Dialog>
                <DialogTrigger
                  asChild
                  className="size-5 text-green-500 cursor-pointer"
                >
                  <PlusCircledIcon onClick={() => UsersModal()} />
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
    <div>
      {isLoading ? (
        <GlobalSkeletonTable />
      ) : (
        <>{data?.data && <GlobalTable columns={columns} data={data?.data} />}</>
      )}
    </div>
  );
}


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
              Balance
            </Label>
            <Input id="name" defaultValue="1000" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Transition No
            </Label>
            <Input
              id="username"
              defaultValue="893853"
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

export default AllDealerComponents;
