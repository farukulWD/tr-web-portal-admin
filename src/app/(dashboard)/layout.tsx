import Sidebar from "@/components/shared/sidebar/Sidebar";
import React from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <section className="flex">
        <div className="p-6">
          <Sidebar />
        </div>
        {children}
      </section>
    </>
  );
};

export default DashboardLayout;
