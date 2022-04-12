import React, {ReactNode} from 'react';
import {
  Provider,
  cacheExchange,
  createClient,
  dedupExchange,
  errorExchange,
  fetchExchange,
  useMutation,
  Operation,
  makeOperation,
} from 'urql';
import {authExchange} from '@urql/exchange-auth';
import {useAuth} from '../hooks/auth.hook';

import {refreshToken_mutation} from '../api/auth/reset-token.mutation';

const getClient = () => {
  const {accessToken, refreshToken, signOut} = useAuth();
  return createClient({
    url: 'http://localhost:4000/graphql',
    exchanges: [
      dedupExchange,
      cacheExchange,
      authExchange({
        addAuthToOperation: ({
          authState,
          operation,
        }: {
          authState: any;
          operation: any;
        }) => {
          // the token isn't in the auth state, return the operation without changes
          if (!authState || !authState.token) {
            return operation;
          }

          // fetchOptions can be a function (See Client API) but you can simplify this based on usage
          const fetchOptions =
            typeof operation.context.fetchOptions === 'function'
              ? operation.context.fetchOptions()
              : operation.context.fetchOptions || {};

          return makeOperation(operation.kind, operation, {
            ...operation.context,
            fetchOptions: {
              ...fetchOptions,
              headers: {
                ...fetchOptions.headers,
                Authorization: authState.accessToken,
              },
            },
          });
        },
        willAuthError: ({authState}) => {
          if (!authState) return true;
          // e.g. check for expiration, existence of auth etc
          return false;
        },
        didAuthError: ({error}) => {
          // check if the error was an auth error (this can be implemented in various ways, e.g. 401 or a special error code)
          return error.graphQLErrors.some(
            e => e.extensions?.code === 'FORBIDDEN',
          );
        },
        getAuth: async ({authState}) => {
          console.log('getAuth');

          // for initial launch, fetch the auth state from storage (local storage, async storage etc)
          if (!authState) {
            if (accessToken && refreshToken) {
              return {accessToken, refreshToken};
            }
            return null;
          }

          await signOut();

          return null;
        },
      }),
      fetchExchange,
    ],
  });
};

export const UrqlProvider = ({children}: {children: ReactNode}) => (
  <Provider value={getClient()}>{children}</Provider>
);
