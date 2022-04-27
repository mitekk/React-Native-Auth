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
import {refreshToken_mutation} from '../api/auth/reset-token.mutation';

const getClient = () => {
  const {accessToken, refreshToken, isLoading, isSignedIn, signIn, signOut} =
    useAuth();
  return createClient({
    url: 'http://localhost:4000/graphql',
    exchanges: [
      dedupExchange,
      cacheExchange,
      errorExchange({
        onError: async error => {
          const isAuthError = error.graphQLErrors.some(
            e => e.extensions?.code === 'FORBIDDEN',
          );

          if (isAuthError) {
            console.log('isAuthError', isAuthError);

            await signOut();
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
          // the token isn't in the auth state, return the operation without changes
          if (!authState || !authState.accessToken) {
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
        getAuth: async ({authState, mutate}): Promise<AuthState | null> => {
          // for initial launch, fetch the auth state from storage (local storage, async storage etc)
          if (!authState) {
            if (accessToken && refreshToken) {
              return {accessToken, refreshToken, isLoading, isSignedIn};
            }

            return null;
          }

          const {data} = await mutate(refreshToken_mutation, {
            token: authState!.refreshToken,
          });
          const reAccessToken = data?.refresh?.accessToken;
          const reRefreshToken = data?.refresh?.refreshToken;

          if (reAccessToken && reRefreshToken) {
            await signIn(reAccessToken, reRefreshToken);
            return {
              accessToken: reAccessToken,
              refreshToken: reRefreshToken,
              isLoading,
              isSignedIn,
            };
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
