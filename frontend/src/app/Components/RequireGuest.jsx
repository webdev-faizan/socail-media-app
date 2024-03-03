"use client";
import { hasCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const RequireGuest = ({ children }) => {
  const router = useRouter();
  useEffect(() => {
    if (hasCookie("auth", { path: "/" })) {
      router.push("/");
    }
  }, []);

  return <>{children}</>;
};

export default RequireGuest;
