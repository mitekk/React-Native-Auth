import React, {ReactNode} from 'react';
import {
  Provider,
  cacheExchange,
  createClient,
  dedupExchange,
  fetchExchange,
  makeOperation,
  errorExchange,
} from 'urql';
import {authExchange} from '@urql/exchange-auth';
import {useAuth} from '../hooks/auth.hook';
import {AuthState} from './auth.provider';

const getClient = () => {
  const {accessToken, refreshToken, isLoading, isSignedIn, signOut} = useAuth();
  return createClient({
    url: 'http://localhost:4000/graphql',
    exchanges: [
      dedupExchange,
      cacheExchange,
      errorExchange({
        onError: error => {
          const isAuthError = error.graphQLErrors.some(
            e => e.extensions?.code === 'FORBIDDEN',
          );

          if (isAuthError) {
            console.log('isAuthError', isAuthError);

            signOut();
          }
        },
      }),
      authExchange({
        addAuthToOperation: ({
          authState,
          operation,
        }: {
          authState: AuthState;
          operation: any;
        }) => {
          console.log('authExchang state', authState);
          console.log('operation', operation);
          // the token isn't in the auth state, return the operation without changes
          if (!authState || !authState.accessToken || !authState.refreshToken) {
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
          console.log('willAuthError', !authState);

          if (!authState) {
            return true;
          }
          // e.g. check for expiration, existence of auth etc
          return false;
        },
        didAuthError: ({error}) => {
          console.log('didAuthError', error);
          // check if the error was an auth error (this can be implemented in various ways, e.g. 401 or a special error code)
          return error.graphQLErrors.some(
            e => e.extensions?.code === 'FORBIDDEN',
          );
        },
        getAuth: async ({authState}): Promise<AuthState | null> => {
          console.log('getAuth', authState);

          // for initial launch, fetch the auth state from storage (local storage, async storage etc)
          if (!authState) {
            console.log('accessToken', accessToken);
            console.log('refreshToken', refreshToken);

            if (accessToken && refreshToken) {
              return {accessToken, refreshToken, isLoading, isSignedIn};
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
