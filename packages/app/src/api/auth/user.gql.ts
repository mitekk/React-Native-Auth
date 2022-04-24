import {gql} from 'urql';

export const user_query = gql`
  query User {
    user {
      id
      name
      email
      verified
      profiles {
        id
        name
        birthdate
        avatar
        color
        mediaUri
        themePref
        balance
        allowances {
          id
        }
      }
    }
  }
`;
