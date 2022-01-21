import {gql} from 'urql';
import {AVATAR_ICONS} from '../mock/avatars.mock';

const login_mut = gql`
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

export const writeToTable = () => {};
