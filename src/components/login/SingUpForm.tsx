"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { toast } from "sonner";
import { useCreateUserMutation } from "@/redux/api/userApi/userApi";
import { useRouter } from "next/navigation";
import TrForm from "../Form/TrForm";
import TrInput from "../Form/inputs/TrInput";
import TrFileUploader from "../Form/inputs/TrFileUploader";
import { globalErrorHandler } from "@/utils";
import { TResponse } from "@/types";
import { Loader2 } from "lucide-react";
import { FormControl, FormItem } from "../ui/form";

const singUpValidationSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters long.",
  }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  address: z.object({
    city: z
      .string({
        message: "City is required.",
      })
      .min(1),
    thana: z
      .string({
        message: "Thana must be a non-negative integer.",
      })
      .min(1),

    postal: z.string().min(1, {
      message: "Postal code must be a positive number.",
    }),
    village: z.string({ message: "Village is required" }),

    country: z
      .string({
        message: "Country is required.",
      })
      .min(1),
  }),
  mobile: z
    .string()
    .regex(/^01[3-9]\d{8}$/, "Invalid mobile number format")
    .min(11)
    .max(14),

  profileImage: z.any(),
});

type singUpFormValues = z.infer<typeof singUpValidationSchema>;

export function SingUpForm({
  toNavigate,
}: {
  toNavigate?: string | undefined;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createUser, { isLoading }] = useCreateUserMutation();
  const router = useRouter();

  async function handleRegister(formData: singUpFormValues) {
    console.log(formData.profileImage);
    console.log(formData);
    const userData = { userData: formData };

    const data = new FormData();
    data.append("file", formData?.profileImage);
    data.append("data", JSON.stringify(userData));
   

    try {
      const res: TResponse<any> = await createUser(data).unwrap();
      if (res) {
        toast.success(res.message);
        console.log(res);
      }
    } catch (error) {
      globalErrorHandler(error);
    }

    // Assuming `createUser` handles FormData
  }

  return (
    <TrForm
      onSubmit={handleRegister}
      resolver={zodResolver(singUpValidationSchema)}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <TrInput
          name="name"
          placeholder="Type your name "
          label="Name"
          type="text"
        />
        <TrInput
          name="email"
          placeholder="Type your Email "
          label="Email"
          type="email"
        />
        <TrInput
          name="mobile"
          placeholder="Mobile"
          label="Mobile"
          type="number"
        />
        <TrInput
          name="address.city"
          placeholder="City"
          label="City"
          type="text"
        />
        <TrInput
          name="address.village"
          placeholder="Village "
          label="Village"
          type="text"
        />
        <TrInput
          name="address.thana"
          placeholder="Thana"
          label="Thana"
          type="text"
        />
        <TrInput
          name="address.postal"
          placeholder="Postal Code"
          label="Postal"
          type="number"
        />
        <TrInput
          name="address.country"
          placeholder="country"
          label="Postal"
          type="text"
        />
      </div>
      {/* <TrFileUploader
        label="Image"
        name="profileImage"
        accept="image/*, .png"
      /> */}

      <Controller
        name="profileImage"
        render={({ field: { onChange, value, ...field } }) => {
          return (
            <FormItem>
              <FormControl>
                <div>
                  <input
                    type="file"
                    value={value?.fileName}
                    onChange={(e) => {
                      onChange(e.target.files?.[0]);
                    }}
                    {...field}
                    onBlur={field.onBlur}
                   accept="image/png, image/gif, image/jpeg"
                  />
                </div>
              </FormControl>
            </FormItem>
          );
        }}
      />

      <Button type="submit" disabled={isLoading}>
        {" "}
        {isLoading && <Loader2 className="animate-spin" />} Register{" "}
      </Button>
    </TrForm>
  );
}
