import {gql} from 'urql';
import {AuthResetPasswordResponse} from '../../types/response/auth.response.type';

export const resetPassword_mutation = gql<AuthResetPasswordResponse>`
  mutation SendResetPasswordEmail($email: String!) {
    sendResetPasswordEmail(email: $email) {
      message
    }
  }
`;
