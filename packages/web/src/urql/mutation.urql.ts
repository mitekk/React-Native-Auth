import { gql } from "urql";

export const reset_password_mutation = gql`
  mutation ResetPassword($email: String!, $password: String!, $token: String!) {
    resetPassword(email: $email, password: $password, token: $token) {
      errors {
        field
        message
      }
      user {
        id
        createdAt
        updatedAt
        email
      }
      token
    }
  }
`;
