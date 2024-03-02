"use client";
import { getCookie, hasCookie } from "cookies-next";
import { Router, useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/withSessionCheck";

const ProtectRoutes = ({ children }) => {
//   const { isAuthenticated } = useContext(AuthContext);
//   const router = useRouter(); 
//   console.log(hasCookie("auth"))
 

  return <>{children}</>;
};

export default ProtectRoutes;
