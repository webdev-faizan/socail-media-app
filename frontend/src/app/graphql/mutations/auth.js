import { gql } from "@apollo/client";

export const SIGNUP_USER = gql`
  mutation ($data: formInput!) {
    signupUser(registerationForm: $data) {
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
