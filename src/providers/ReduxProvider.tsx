"use client";
import { Toaster } from "@/components/ui/sonner";
import { persistor, store } from "@/redux/store";

import React from "react";
import { Provider } from "react-redux";
import MainProvider from "./MainProvider";
import { PersistGate } from "redux-persist/integration/react";

const ReduxProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <MainProvider>{children}</MainProvider>
      </PersistGate>
    </Provider>
  );
};

export default ReduxProvider;
