"use client";
import React from "react";
import { ApolloProvider } from "@apollo/client";
import client from "./graphql/client.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthProvider from "./provider/withSessionCheck.jsx";
const Index = ({ children }) => {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>{children}</AuthProvider>
    </ApolloProvider>
  );
};

export default Index;
