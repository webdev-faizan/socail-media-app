import { gql } from "@apollo/client";

export const PROFILE_CHANGE = gql`
  mutation ($profile: Upload) {
    profileChange(profileImg: $profile) {
      message
    }
  }
`;
