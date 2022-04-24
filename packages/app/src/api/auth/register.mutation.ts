import {gql} from 'urql';
import {AuthRegisterResponse} from '../../types/response/auth.response.type';

export const register_mutation = gql<AuthRegisterResponse>`
  mutation Register($name: String!, $email: String!, $password: String!) {
    register(credentials: {name: $name, email: $email, password: $password}) {
      errors {
        field
        message
      }
      accessToken
      refreshToken
      message
    }
  }
`;
