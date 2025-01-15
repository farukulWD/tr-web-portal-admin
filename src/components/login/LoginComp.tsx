"use client";

import React from "react";

import { z } from "zod";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { useLoginMutation } from "@/redux/api/auth/authApi";
import TrForm from "../Form/TrForm";
import { Button } from "../ui/button";
import TrInput from "../Form/inputs/TrInput";
import TrPasswordInput from "../Form/inputs/TrPasswordInput";
import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "sonner";

import { setToken, setUserId } from "@/redux/features/auth/authSlice";
import { useRouter } from "next-nprogress-bar";
import { useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { globalErrorHandler } from "@/utils";
import { useAppDispatch } from "@/redux/hook";
import { jwtDecode } from "jwt-decode";

const loginSchema = z.object({
  code: z
    .string()
    .min(6, { message: "Code must be at least 6 characters." })
    .max(6, { message: "Code must be at most 6 characters." }),

  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." }),
});
const LoginComp = () => {
  const dispatach = useAppDispatch();
  const router = useRouter();
  const search = useSearchParams();

  const redirect = search.get("redirect");
  const [login, { isLoading }] = useLoginMutation();

  const submitLogic = async (vales: any) => {
    try {
      const res = await login(vales).unwrap();
      if (res.success) {
        dispatach(setToken(res?.data?.accessToken));
        localStorage.setItem("accessToken", res?.data?.accessToken);
        const decoded: any = await jwtDecode(res?.data?.accessToken);
        if (decoded) {
          dispatach(setUserId(decoded?.userId));
        }
        toast.success(res.message);
        router.push(redirect || "/dashboard");
      }
    } catch (error) {
      globalErrorHandler(error);
    }
  };
  const defaultValue = {
    code: "250001",
    password: "01774605255",
  };
  return (
    <>
      <Card className="mx-auto max-w-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Admin Login</CardTitle>
          <CardDescription>
            Enter your Code and password to login as Admin
          </CardDescription>
        </CardHeader>
        <CardContent>
          <TrForm
            onSubmit={submitLogic}
            defaultValues={defaultValue}
            resolver={zodResolver(loginSchema)}
          >
            <TrInput
              name="code"
              placeholder="Type your Code "
              label="User Id"
              type="number"
            />
            <TrPasswordInput
              name="password"
              placeholder="Type Your password"
              label="Password"
            />

            <Button disabled={isLoading} type="submit">
              {isLoading && <Loader2 className="animate-spin" />} Login
            </Button>
          </TrForm>
        </CardContent>
      </Card>
    </>
  );
};

export default LoginComp;
