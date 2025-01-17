"use client";
import { useGetDealersQuery } from "@/redux/api/dealerApi/dealerApi";
import React, { useState } from "react";
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
import { UpdateIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { AlertDialogHeader } from "../ui/alert-dialog";
import TrForm from "../Form/TrForm";
import TrInput from "../Form/inputs/TrInput";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { balaceSchema } from "@/types/balance";
import { useAddBalanceMutation } from "@/redux/api/balanceApi/balanceApi";
import { globalErrorHandler } from "@/utils";
import { toast } from "sonner";
export type TAddBalanceType = z.infer<typeof balaceSchema>;
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
                <UpdateIcon />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem className="cursor-pointer">
                  <strong>Deactive</strong>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <strong>Active</strong>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="flex justify-center items-center w-full">
              {UsersModal(item as TDealer)}
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

export const UsersModal = (record: TDealer) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false); // State for dialog visibility
  const [addBalance, { isLoading }] = useAddBalanceMutation();

  const handleAddBalance = async (data: TAddBalanceType) => {
    try {
      const res = await addBalance(data).unwrap();
      if (res.success) {
        toast.success(res.message);
        setIsDialogOpen(false); // Close the dialog on success
      }
    } catch (error) {
      globalErrorHandler(error);
    }
  };

  const defaultData = {
    dealer: record?._id,
    amount: "",
    transactionNo: "",
    receivedBank: "",
    senderBank: "",
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild className="cursor-pointer">
        <span>+ Add Balance</span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <AlertDialogHeader>
          <DialogTitle>Add Balance</DialogTitle>
        </AlertDialogHeader>
        <TrForm
          onSubmit={handleAddBalance}
          resolver={zodResolver(balaceSchema)}
          className="grid gap-4 py-4"
          defaultValues={defaultData}
        >
          <TrInput
            className=""
            readonly
            name="dealer"
            label="Dealer"
            placeholder="Dealer"
            type="text"
          />
          <TrInput
            name="amount"
            label="Amount"
            placeholder="Amount"
            type="number"
          />
          <TrInput
            name="transactionNo"
            label="Transaction No"
            placeholder="Transaction No"
            type="text"
          />
          <TrInput
            name="receivedBank"
            label="Received Bank"
            placeholder="Received Bank"
            type="text"
          />
          <TrInput
            name="senderBank"
            label="Sender Bank"
            placeholder="Sender Bank"
            type="text"
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Processing..." : "Add Balance"}
          </Button>
        </TrForm>
      </DialogContent>
    </Dialog>
  );
};

export default AllDealerComponents;
