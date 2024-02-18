import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "@/components/ui/custom/Sidebar";
import io from "socket.io-client";
import { useAuth } from "@/lib/context/AuthContext";
const socket = io(import.meta.env.VITE_DOMAIN_URL);
const RootLayout = () => {
  const { isAuthenticated } = useAuth();
  return (
    <>
      {isAuthenticated ? (
        <>
          <div className="flex h-screen w-full">
            <Sidebar socket={socket} />
            <section className="flex flex-1">
              <Outlet context={socket} />
            </section>
          </div>
        </>
      ) : (
        <div className="bg-black text-white h-screen flex justify-center items-center">
          <p className="text-center">Page Not Accessible</p>
        </div>
      )}
    </>
  );
};

export default RootLayout;
