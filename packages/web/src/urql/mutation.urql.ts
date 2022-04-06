import { gql } from "urql";

export const reset_password_mutation = gql`
  mutation ResetPassword($email: String!, $password: String!, $token: String!) {
    resetPassword(email: $email, password: $password, token: $token) {
      message
    }
  }
`;

export const verify_email_mutation = gql`
  mutation VerifyEmail($token: String!) {
    verifyEmail(token: $token) {
      errors {
        message
      }
      message
    }
  }
`;
