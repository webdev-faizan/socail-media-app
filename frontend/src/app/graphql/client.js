"use client";
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  concat,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context";
import { getCookie } from "cookies-next";
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";
const uri = "http://localhost:3001/graphql";
const uploadLink = createUploadLink({ uri });
const httpLink = createHttpLink({
  uri,
});
const authLink = setContext((_, { headers }) => {
  const token = getCookie("auth");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message }) => {
      console.error(`[GraphQL error]: ${message}`);
      // Here you can display the error message using any UI component like toast
    });
  }
  if (networkError) {
    console.error(`[Network error]: ${networkError}`);
    // Handle network errors if needed
  }
});
const client = new ApolloClient({
  link: concat(authLink, uploadLink, httpLink, errorLink),
  cache: new InMemoryCache(),
});

export default client;
