"use client";
import React, { useState } from "react";
import { z } from "zod";
import TrForm from "../Form/TrForm";
import { zodResolver } from "@hookform/resolvers/zod";
import TrInput from "../Form/inputs/TrInput";
import { Controller } from "react-hook-form";
import { FormControl, FormItem } from "../ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useCreateDelerMutation } from "@/redux/api/dealerApi/dealerApi";
import { Loader2 } from "lucide-react";
import { globalErrorHandler } from "@/utils";
import { toast } from "sonner";
import { TResponse } from "@/types";
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
const makeDealerSchema = z.object({
  shopName: z.string({ message: "Shop Name is Required" }),
  nidNo: z.string({ message: "NID number is required" }),
  // nidPic: z.any({ message: "NID Pic is required" }),
  nidPic: z
    .any()
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      "Nid is Required (.jpg, .jpeg, .png and .webp formats are supported)."
    ),
  refName: z.string({ message: "Reference name is required" }),
  refNidNo: z.string({ message: "Reference ID is required" }),
  refNid: z
    .any()
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      "Reference NID number is required (.jpg, .jpeg, .png and .webp formats are supported)."
    ),
  refMobile: z.string({ message: "Mobile number is required" }).min(10).max(14),
  refPhoto: z
    .any()
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      "Reference photo URL is required (.jpg, .jpeg, .png and .webp formats are supported)."
    ),
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
  userId: string | null;
};

function MakeDealerComponent({ id }: { id: string }) {
  const [createDeler, { isLoading }] = useCreateDelerMutation();
  const [photos, setPhotos] = useState({
    nidPic: "",
    refNid: "",
    refPhoto: "",
  });
  const handleMakeDealer = async (data: MakeDealerFormData): Promise<void> => {
    // Handle form submission logic here
    const { nidPic, refNid, refPhoto, ...rest } = data;

    rest.userId = id;

    const formData = new FormData();

    formData.append("nidPic", nidPic);
    formData.append("refNid", refNid);
    formData.append("refPhoto", refPhoto);

    formData.append("data", JSON.stringify(rest));

    try {
      const res: TResponse<any> = await createDeler(formData).unwrap();
      if (res) {
        toast.success(res?.message);
      }
    } catch (error) {
      globalErrorHandler(error);
    }
  };

  return (
    <div className="flex justify-center items-center ">
      <TrForm
        onSubmit={handleMakeDealer}
        resolver={zodResolver(makeDealerSchema)}
        className="w-full my-auto"
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
            }) => {
              return (
                <FormItem>
                  <FormControl>
                    <div>
                      <label htmlFor="nidPic">Nid</label>
                      <Input
                        type="file"
                        id="nidPic"
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
              );
            }}
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
                      <label htmlFor="refNid">Ref Nid</label>
                      <Input
                        type="file"
                        id="refNid"
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
                    <label htmlFor="refPhoto">Select Ref Photo</label>
                    <Input
                      type="file"
                      id="refPhoto"
                      placeholder="Add Nomoni Photo"
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

        <Button disabled={isLoading} type="submit">
          {" "}
          {isLoading && <Loader2 className="animate-spin" />} Submit
        </Button>
      </TrForm>
    </div>
  );
}

export default MakeDealerComponent;
