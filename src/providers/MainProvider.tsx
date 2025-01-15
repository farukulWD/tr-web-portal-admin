"use client";
import React, { useEffect } from "react";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { useGetSingleUserQuery } from "@/redux/api/auth/authApi";
import { setUser } from "@/redux/features/auth/authSlice";

export default function MainProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = useAppSelector((s) => s.auth);
  const dispatch = useAppDispatch();
  const { data } = useGetSingleUserQuery(undefined, { skip: !userId });

  useEffect(() => {
    dispatch(setUser(data?.data));
  }, [data]);
  return (
    <>
      {children}

      <ProgressBar
        height="4px"
        color="#f9be34"
        options={{ showSpinner: false }}
        shallowRouting
      />
    </>
  );
}
