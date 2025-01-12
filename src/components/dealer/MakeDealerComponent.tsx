"use client";
import React from "react";
import { z } from "zod";
import TrForm from "../Form/TrForm";
import { zodResolver } from "@hookform/resolvers/zod";
import TrInput from "../Form/inputs/TrInput";
import { Controller } from "react-hook-form";
import { FormControl, FormItem } from "../ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useCreateDelerMutation } from "@/redux/api/dealerApi/dealerApi";

const makeDealerSchema = z.object({
  shopName: z.string({ message: "Shop Name is Required" }),
  nidNo: z.string({ message: "NID number is required" }),
  nidPic: z.any({ message: "NID Pic is required" }),
  refName: z.string({ message: "Reference name is required" }),
  refNidNo: z.string({ message: "Reference ID is required" }),
  refNid: z.any({ message: "Reference NID number is required" }),
  refMobile: z.string({ message: "Mobile number is required" }).min(10).max(14),
  refPhoto: z.any({ message: "Reference photo URL is required" }),
  group: z.string({ message: "Group is required" }),
  mobile: z.string({ message: "Mobile number is required" }).min(10).max(14),
});

export type MakeDealerFormData = {
  shopName: string;
  nidNo: string;
  nidPic: File;
  refName: string;
  refNidNo: string;
  refNid: File;
  refMobile: string;
  refPhoto: File;
  group: string;
  mobile: string;
  userId:string|null
};

function MakeDealerComponent({ id }: { id: string }) {
    const [createDeler]=useCreateDelerMutation()
  const handleMakeDealer = async (data: MakeDealerFormData): Promise<void> => {
    // Handle form submission logic here
   const {nidPic,refNid,refPhoto,...rest}=data

   rest.userId = id 

    


    const formData = new FormData()

    formData.append("nidPic",nidPic)
    formData.append("refNid",refNid)
    formData.append("refPhoto",refPhoto)

    formData.append("data", JSON.stringify(rest));

    console.log(Object.fromEntries(formData))
    const res = await createDeler(formData).unwrap()
  };

  return (
    <div>
      <TrForm
        onSubmit={handleMakeDealer}
        resolver={zodResolver(makeDealerSchema)}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <TrInput label="Shop Name" name="shopName" placeholder="Shop Name" />
          <TrInput
            type="number"
            label="NID No"
            name="nidNo"
            placeholder="Provide Dealer NID"
          />

          <Controller
            name={"nidPic"}
            render={({
              field: { onChange, value, ...field },
              fieldState: { error },
            }) => (
              <FormItem>
                <FormControl>
                  <div>
                    <Input
                      type="file"
                      value={value?.fileName || ""}
                      onChange={(e) => onChange(e.target.files?.[0])}
                      {...field}
                      accept="image/png, image/gif, image/jpeg"
                    />
                  </div>
                </FormControl>
                {error && (
                  <strong className="text-red-400 text-xs">
                    {error?.message}
                  </strong>
                )}
              </FormItem>
            )}
          />
          <TrInput
            label="Reference Name"
            name="refName"
            placeholder="Reference Name"
          />
          <TrInput
            type="number"
            label="Reference NID No"
            name="refNidNo"
            placeholder="Reference NID No"
          />

          <Controller
            name={"refNid"}
            render={({
              field: { onChange, value, ...field },
              fieldState: { error },
            }) => {
                
              return (
                <FormItem>
                  <FormControl>
                    <div>
                      <Input
                        type="file"
                        value={value?.fileName || ""}
                        onChange={(e) => onChange(e.target.files?.[0])}
                        {...field}
                        accept="image/png, image/gif, image/jpeg"
                      />
                    </div>
                  </FormControl>
                  {error && (
                    <strong className="text-red-400 text-xs">
                      {error?.message}
                    </strong>
                  )}
                </FormItem>
              );
            }}
          />
          <TrInput
            type="number"
            label="Reference Mobile"
            name="refMobile"
            placeholder="Reference Mobile Number"
          />

          <Controller
            name={"refPhoto"}
            render={({
              field: { onChange, value, ...field },
              fieldState: { error },
            }) => (
              <FormItem>
                <FormControl>
                  <div>
                    <Input
                      type="file"
                      value={value?.fileName}
                      onChange={(e) => onChange(e.target.files?.[0])}
                      {...field}
                      accept="image/png, image/gif, image/jpeg"
                    />
                  </div>
                </FormControl>
                {error && (
                  <strong className="text-red-400 text-xs">
                    {error?.message}
                  </strong>
                )}
              </FormItem>
            )}
          />
          <TrInput label="Group" name="group" placeholder="Group Name" />
          <TrInput
            type="number"
            label="Mobile Number"
            name="mobile"
            placeholder="Mobile Number"
          />
        </div>

        <Button type="submit">Submit</Button>
      </TrForm>
    </div>
  );
}

export default MakeDealerComponent;
