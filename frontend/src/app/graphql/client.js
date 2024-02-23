"use client";
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  concat,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { getCookie } from "cookies-next";
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";

const uri = "http://localhost:3001/graphql";
const link = createUploadLink({ uri });
const authLink = setContext((_, { headers }) => {
  const token = getCookie("auth");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const httpLink = createHttpLink({
  uri,
});

const client = new ApolloClient({
  link,
  // link: concat(authLink, httpLink),
  cache: new InMemoryCache(),
});

export default client;
