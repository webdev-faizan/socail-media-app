import { hasCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const RequireGuest = ({ Children }) => {
  const router = useRouter();
  if (hasCookie("auth")) {
    router("/");
  }
  return <>{Children}</>;
};

export default RequireGuest;
