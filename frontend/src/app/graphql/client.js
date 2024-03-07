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

const client = new ApolloClient({
  link: concat(authLink, uploadLink, httpLink),
  cache: new InMemoryCache({
    // typePolicies: {
    //   post: {
    //     keyFields: ["all_post", "user_post", "share_post"],
    //   },
    //   profile: {
    //     keyFields: ["user_profile", "share_profile"],
    //   },
    // },
  }),
});

export default client;
// Faraid@11