import { gql } from "@apollo/client";

export const GET_USER_PERSONAL_INFO = gql`
  query {
    getUserPersonalInfo {
      firstName
      lastName
      profile
    }
  }
`;
