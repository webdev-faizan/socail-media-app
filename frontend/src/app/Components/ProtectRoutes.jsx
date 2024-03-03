"use client";
import { deleteCookie, getCookie, hasCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect } from "react";
import { AuthContext } from "../provider/withSessionCheck";
import Navigations from "../layout/Navigations";
const ProtectRoutes = ({ children }) => {
  const { isAuthenticated, token } = useContext(AuthContext);
  const router = useRouter();
  if (hasCookie("auth") && isAuthenticated && getCookie("auth") == token) {
    return (
      <>
        <Navigations />
        {children}
      </>
    );
  } else {
    deleteCookie("auth");
    deleteCookie("user_id");
    router.push("/auth/login");
  }
};
export default ProtectRoutes;
