"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { TFormField } from "@/types/globalTypes";
import { z } from "zod";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import GlobalForm from "../shared/global/GlobalForm";
import Link from "next/link";
import SingUpForm from "./SingUpForm";
// import { useRouter } from "next/navigation";

const SingUpComp = () => {
  // const navigate = useRouter();
  const formFields: TFormField[] = [
    {
      name: "name",
      label: "Name",
      placeholder: "Example Name",
      type: "text",
      validation: z.string({ message: "Please enter your Name." }).min(1),
    },
    {
      name: "address.address",
      label: "Address",
      placeholder: "123 Main St",
      type: "text",
      validation: z.string().require({ message: "Please enter your address." }),
    },
    {
      name: "address.city",
      label: "City",
      placeholder: "City Name",
      type: "text",
      validation: z.string({ message: "Please enter your city." }).min(1),
    },
    {
      name: "address.thana",
      label: "Thana",
      placeholder: "Thana Name",
      type: "text",
      validation: z.string({ message: "Please enter your thana." }).min(1),
    },
    {
      name: "address.postal",
      label: "Postal Code",
      placeholder: "12345",
      type: "number",
      validation: z
        .number()
        .positive({ message: "Postal code must be a positive number." }),
    },
    {
      name: "address.country",
      label: "Country",
      placeholder: "Bangladesh",
      type: "text",
      validation: z
        .string({ message: "Country must be 'Bangladesh'." })
        .default("Bangladesh"),
    },
    {
      name: "mobile",
      label: "Mobile",
      placeholder: "+8801234567890",
      type: "tel",
      validation: z.string().regex(/^\+880[0-9]{10}$/, {
        message: "Enter a valid Bangladeshi mobile number.",
      }),
    },
    {
      name: "password",
      label: "Password",
      placeholder: "Enter your password",
      type: "password",
      validation: z
        .string()
        .min(6, { message: "Password must be at least 6 characters." }),
    },
  ];

  const submitLogic = async (vales: any) => {
    console.log(vales);
    // if (vales) {
    //   navigate.replace("/");
    // }
  };
  return (
    <>
      <Card className="mx-auto min-w-[40%] ">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Singup</CardTitle>
          <CardDescription>
            Enter your name, email and password to singup to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SingUpForm formFields={formFields} submitLogic={submitLogic} />
          <p className="mt-5 text-center">
            Already have an account please{" "}
            <Link href="/login" className="underline text-blue-500 ml-">
              Login
            </Link>
          </p>
        </CardContent>
      </Card>
    </>
  );
};

export default SingUpComp;
