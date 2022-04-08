import {gql} from 'urql';
import {
  AuthLoginResponse,
  AuthRegisterResponse,
  AuthRestorePasswordResponse,
} from '../types/user/response.type';

export const register_mutation = gql<AuthRegisterResponse>`
  mutation Register($name: String!, $email: String!, $password: String!) {
    register(credentials: {name: $name, email: $email, password: $password}) {
      errors {
        field
        message
      }
      user {
        id
        name
        email
        createdAt
        updatedAt
      }
      refreshToken
      accessToken
    }
  }
`;

export const login_mutation = gql<AuthLoginResponse>`
  mutation Login($email: String!, $password: String!) {
    login(credentials: {email: $email, password: $password}) {
      errors {
        field
        message
      }
      user {
        id
        name
        email
        createdAt
        updatedAt
      }
      refreshToken
      accessToken
    }
  }
`;

export const restorePassword_mutation = gql<AuthRestorePasswordResponse>`
  mutation SendRestorePasswordEmail($email: String!) {
    sendRestorePasswordEmail(email: $email) {
      message
    }
  }
`;
