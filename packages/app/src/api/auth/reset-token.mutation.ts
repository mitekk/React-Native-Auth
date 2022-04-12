import {gql} from 'urql';
import {AuthResetPasswordResponse} from '../../types/user/response.type';

export const refreshToken_mutation = gql<AuthResetPasswordResponse>`
  mutation Refresh($accessToken: String!, $refreshToken: String!) {
    refresh(tokens: {accessToken: $accessToken, refreshToken: $refreshToken}) {
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
