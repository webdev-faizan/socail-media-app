import { gql } from "@apollo/client";

export const SIGNUP_USER = gql`
  mutation ($data: formInput!) {
    signupUser(registerationForm: $data) {
      message
    }
  }
`;
// export const VERIFY_EMAIL = gql`
//   mutation ($token) {
//     emailVerification($token) {
//       message
//     }
//   }
// `;

export const VERIFY_EMAIL = gql`
  mutation VerifyEmail($token: String!) {
    emailVerification(token: $token) {
      message
    }
  }
`;
export const LOGIN_USER = gql`
  mutation ($data: signInFormInput!) {
    loginUser(signInForm: $data) {
      message
      token
    }
  }
`;

// export const LOGIN_USER = gql`
//   mutation ($data: formInput!) {
//     loginUser(signInForm: $data) {
//       message
//     }
//   }
// `;
