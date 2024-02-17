import React from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "@/lib/context/AuthContext";
const AuthLayout = () => {
  const { isAuthenticated } = useAuth();
  return (
    <>
      {!isAuthenticated ? (
        <>
          <section className="flex flex-1 justify-center items-center py-10">
            <Outlet />
          </section>
          <img
            className="hidden xl:block w-1/2 h-screen object-cover bg-no-repeat"
            src="../assets/images/chat-app.png"
          />
        </>
      ) : undefined}
    </>
  );
};

export default AuthLayout;
