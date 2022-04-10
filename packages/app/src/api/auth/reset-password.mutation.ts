import {gql} from 'urql';
import {AuthResetPasswordResponse} from '../../types/user/response.type';

export const resetPassword_mutation = gql<AuthResetPasswordResponse>`
  mutation SendResetPasswordEmail($email: String!) {
    sendResetPasswordEmail(email: $email) {
      message
    }
  }
`;
