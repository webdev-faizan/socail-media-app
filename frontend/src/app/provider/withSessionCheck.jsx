"use client";
import { hasCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useLayoutEffect,
} from "react";

export const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [data, setData] = useState(null);
  const router = useRouter();
  useEffect(() => {
    console.log("faizan inside")
    if (!hasCookie("auth")) {
      setIsAuthenticated(false);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
