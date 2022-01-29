import {gql} from 'urql';

export const register_mutation = gql`
  mutation Register($email: String!, $password: String!) {
    register(credentials: {email: $email, password: $password}) {
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

export const login_mutation = gql`
  mutation Login($email: String!, $password: String!) {
    login(credentials: {email: $email, password: $password}) {
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
