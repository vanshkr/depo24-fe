import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "@/components/ui/custom/Sidebar";
import io from "socket.io-client";
const socket = io("http://localhost:5000");
const RootLayout = () => {
  useEffect(() => {
    // return () => {
    //   socket.disconnect();
    //   socket.off();
    // };
  }, []);
  return (
    <div className="flex w-full">
      <Sidebar socket={socket} />
      <section className="flex flex-1">
        <Outlet context={socket} />
      </section>
    </div>
  );
};

export default RootLayout;
