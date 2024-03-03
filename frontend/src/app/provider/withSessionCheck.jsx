"use client";
import { useLazyQuery } from "@apollo/client";
import { getCookie, hasCookie, deleteCookie } from "cookies-next";
import { GET_USER_STATUS_QUERY } from "../graphql/query/userStatus.js";
import React, { createContext, useState, useLayoutEffect } from "react";
export const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [token, setToken] = useState(getCookie("auth"));
  const [checkUserStatus] = useLazyQuery(GET_USER_STATUS_QUERY, {
    onCompleted: ({ userStatus }) => {
      setIsAuthenticated(userStatus.isAuthenticated);
      if (userStatus.isAuthenticated) {
        setToken(getCookie("auth"));
        return;
      } else {
        if (!window.location.pathname.startsWith("/auth")) {
          deleteCookie("auth");
          deleteCookie("user_id");
        }
      }
    },
  });
  useLayoutEffect(() => {
    if (!hasCookie("auth") || getCookie("auth").length < 20) {
      setIsAuthenticated(false);
    } else if (getCookie("auth") != undefined) {
      checkUserStatus();
    }
  }, [getCookie("auth")]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, token }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
