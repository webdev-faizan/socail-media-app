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

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        // Define custom merge functions or cache policies for specific fields
      },
    },
  },
  addTypename: true, // Automatically add __typename to queries, which can help with cache normalization
  resultCaching: true, // Enable result caching to reuse query results
  possibleTypes: {
    // Define possible types for polymorphic types if necessary
    // For example, if your schema includes interfaces or unions
  },
  dataIdFromObject: (object) => {
    // Customize the cache key generation based on the object type and id
    // This function should return a unique identifier for each object in the cache
  },
  cacheRedirects: {
    // Define custom cache redirects for specific queries
    // Cache redirects allow you to customize how Apollo Client reads from and writes to the cache
  },
  // Additional cache options
  // fragmentMatcher: /* Define your fragment matcher function here */
  freezeResults: false, // Set to true to freeze query results before caching them
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
  cache,
});

export default client;
// Faraid@11
