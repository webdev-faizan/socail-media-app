import { gql } from "@apollo/client";

export const GET_USER_STATUS_QUERY = gql`
  query {
    userStatus {
      message
      isAuthenticated
    }
  }
`;
