import {createClient, Provider} from 'urql';

export const Urql = {
  client: createClient({
    url: 'http://localhost:4000/graphql',
  }),
  Provider,
};
