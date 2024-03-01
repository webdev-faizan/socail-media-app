import { gql } from "@apollo/client";

export const GET_USER_PERSONAL_INFO = gql`
  query {
    getUserPersonalInfo {
      firstName
      lastName
      profile
      _id
    }
  }
`;

export const GET_VIEW_PERSONAL_INFO = gql`
  query ($id: ID!) {
    getViewUserInfo(id: $id) {
      firstName
      lastName
      profile
      _id
    }
  }
`;
