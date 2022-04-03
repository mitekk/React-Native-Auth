import {gql} from 'urql';

export const register_mutation = gql`
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
      token
    }
  }
`;

export const login_mutation = gql`
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
      token
    }
  }
`;

export const restorePassword_mutation = gql`
  mutation SendRestorePasswordEmail($email: String!) {
    sendRestorePasswordEmail(email: $email) {
      message
    }
  }
`;
