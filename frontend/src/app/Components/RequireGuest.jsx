"use client";
import { hasCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const RequireGuest = ({ children }) => {
  const router = useRouter();
  if (hasCookie("auth", { path: "/" })) {
    router.push("/");
  } else {
    return <>{children}</>;
  }
};

export default RequireGuest;
