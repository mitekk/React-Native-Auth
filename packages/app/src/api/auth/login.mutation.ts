import {gql} from 'urql';
import {AuthLoginResponse} from '../../types/user/response.type';

export const login_mutation = gql<AuthLoginResponse>`
  mutation Login($email: String!, $password: String!) {
    login(credentials: {email: $email, password: $password}) {
      errors {
        message
      }
      refreshToken
      message
      accessToken
    }
  }
`;
