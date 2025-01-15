"use client";
import { AppSidebar } from "@/components/shared/asideBar/app-sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarSeparator,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useAppSelector } from "@/redux/hook";
import { store } from "@/redux/store";
import React from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAppSelector((s) => s.auth);
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="overflow-hidden overflow-y-auto ">
          <header className="flex sticky top-0 bg-background h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <SidebarSeparator orientation="vertical" className="mr-2 h-4" />
            {/* <GBreadcrumb /> */}

            <div className="flex gap-1 items-center">
              <Avatar className="h-5 w-5" >
                <AvatarImage src={user?.profileImg} />
                <AvatarFallback>
                  {user?.name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <h3>{user?.name}</h3>
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
};

export default DashboardLayout;
