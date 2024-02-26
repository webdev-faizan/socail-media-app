import { gql } from "@apollo/client";

export const SIGNUP_USER = gql`
  mutation ($data: formInput!) {
    signupUser(registerationForm: $data) {
      message
    }
  }
`;
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
      id
    }
  }
`;
export const FORTGET_PASSWORD = gql`
  mutation ForgetPassword($email: String!) {
    forgetPassword(email: $email) {
      message
    }
  }
`;

export const NEW_PASSWORD = gql`
  mutation ($token: String, $password: String) {
    newPassword(token: $token, password: $password) {
      message
    }
  }
`;
