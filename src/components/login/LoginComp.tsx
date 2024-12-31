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
// import { useRouter } from "next/navigation";

const LoginComp = () => {
  // const navigate = useRouter();
  const formFields: TFormField[] = [
    {
      name: "email",
      label: "Email",
      placeholder: "example@domain.com",
      // description: "Enter your email address.",
      type: "email",
      validation: z
        .string()
        .email({ message: "Please enter a valid email address." }),
    },
    {
      name: "password",
      label: "Password",
      placeholder: "Enter your password",
      // description: "Choose a strong password.",
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
      <Card className="mx-auto max-w-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Login</CardTitle>
          <CardDescription>
            Enter your email and password to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <GlobalForm formFields={formFields} submitLogic={submitLogic} />
          <p className="mt-5 text-center">
            You don't have account please{" "}
            <Link href="/singup" className="underline text-blue-500">
              Sing up
            </Link>
          </p>
        </CardContent>
      </Card>
    </>
  );
};

export default LoginComp;
