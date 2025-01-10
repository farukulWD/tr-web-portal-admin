"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import Link from "next/link";
import { SingUpForm } from "./SingUpForm";

// import { useRouter } from "next/navigation";
export type TsingUpData = {
  name: string;
  email: string;
  mobile: string;

  password: string;

  address?: {
    address: string;
    city: string;
    thana: string;
    postal: number;
    country: string;
  };
};
const SingUpComp = () => {
  // const navigate = useRouter();

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
          <SingUpForm toNavigate="/" />
          <p className="mt-5 text-center">
            Already have an account please{" "}
            <Link href="/" className="underline text-blue-500 ml-">
              Login
            </Link>
          </p>
        </CardContent>
      </Card>
    </>
  );
};

export default SingUpComp;
