"use client";
import { getCookie, hasCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";
import { AuthContext } from "../provider/withSessionCheck";

const ProtectRoutes = ({ children }) => {
  const { isAuthenticated, token } = useContext(AuthContext);
  const router = useRouter();
  if (hasCookie("auth") && isAuthenticated && getCookie("auth") == token) {
    return <>{children}</>;
  } else {
    router.push("/auth/login");
  }
};
export default ProtectRoutes;
