import {gql} from 'urql';
import {AuthRefreshTokenResponse} from '../../types/response/auth.response.type';

export const refreshToken_mutation = gql<AuthRefreshTokenResponse>`
  mutation Refresh($refreshToken: String!) {
    refresh(tokens: {refreshToken: $refreshToken}) {
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
