"use client";
import { Toaster } from "@/components/ui/sonner";
import { store } from "@/redux/store/store";
import React from "react";
import { Provider } from "react-redux";

const ReduxProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Provider store={store}>{children}</Provider>
      <Toaster />
    </>
  );
};

export default ReduxProvider;
