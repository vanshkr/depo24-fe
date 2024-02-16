import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "@/components/ui/custom/Sidebar";
const RootLayout = () => {
  return (
    <div className="flex w-full">
      <Sidebar />
      <section className="flex flex-1">
        <Outlet />
      </section>
    </div>
  );
};

export default RootLayout;
