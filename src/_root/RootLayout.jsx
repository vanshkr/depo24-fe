import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "@/components/ui/custom/Sidebar";
import io from "socket.io-client";
import { useAuth } from "@/lib/context/AuthContext";
const socket = io("http://localhost:5000");
const RootLayout = () => {
  const { isAuthenticated } = useAuth();
  console.log(isAuthenticated);
  useEffect(() => {
    // return () => {
    //   socket.disconnect();
    //   socket.off();
    // };
  }, []);
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
      ) : undefined}
    </>
  );
};

export default RootLayout;
