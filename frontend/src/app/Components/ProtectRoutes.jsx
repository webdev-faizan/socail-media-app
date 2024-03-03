"use client";
import { deleteCookie, getCookie, hasCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";
import { AuthContext } from "../provider/withSessionCheck";
const ProtectRoutes = ({ children }) => {
  const { isAuthenticated, token } = useContext(AuthContext);
  const router = useRouter();
  if (hasCookie("auth") && isAuthenticated && getCookie("auth") == token) {
    return <>{children}</>;
  } else {
    deleteCookie("auth");
    deleteCookie("user_id");
    router.push("/auth/login");
  }
};
export default ProtectRoutes;
