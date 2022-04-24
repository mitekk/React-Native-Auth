import React, {
  createContext,
  ReactNode,
  useReducer,
  useEffect,
  useMemo,
} from 'react';
import {useMutation} from 'urql';
import {refreshToken_mutation} from '../api/auth/reset-token.mutation';
import {
  getAccessToken,
  getRefreshToken,
  removeAccessToken,
  removeRefreshToken,
  setAccessToken,
  setRefreshToken,
} from '../utils/auth/secure-store.util';

type AuthAction =
  | {
      type: 'RESTORE_TOKEN';
      accessToken: string;
      refreshToken: string;
    }
  | {type: 'SIGN_IN'; accessToken: string; refreshToken: string}
  | {type: 'SIGN_OUT'};

export interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  isLoading: boolean;
  isSignedIn: boolean;
}

interface AuthContextActions {
  signIn: (accessToken: string, refreshToken: string) => void;
  signOut: () => void;
}

export interface AuthContextType extends AuthState, AuthContextActions {}

export const AuthContext = createContext<AuthContextType>({
  accessToken: null,
  refreshToken: null,
  isLoading: true,
  isSignedIn: true,
  signIn: async () => {},
  signOut: async () => {},
});

const AuthReducer = (prevState: AuthState, action: AuthAction): AuthState => {
  console.log('action', action);

  switch (action.type) {
    case 'RESTORE_TOKEN':
      return {
        ...prevState,
        accessToken: action?.accessToken || null,
        refreshToken: action?.refreshToken || null,
        isLoading: false,
        isSignedIn: true,
      };
    case 'SIGN_IN':
      return {
        ...prevState,
        accessToken: action?.accessToken || null,
        refreshToken: action?.refreshToken || null,
        isLoading: false,
        isSignedIn: true,
      };
    case 'SIGN_OUT':
      return {
        ...prevState,
        accessToken: null,
        refreshToken: null,
        isLoading: false,
        isSignedIn: false,
      };
  }
};

export const AuthProvider = ({children}: {children: ReactNode}) => {
  const [{}, refreshTokens] = useMutation(refreshToken_mutation);
  const [state, dispatch] = useReducer(AuthReducer, {
    accessToken: null,
    refreshToken: null,
    isLoading: true,
    isSignedIn: true,
  });

  useEffect(() => {
    const initState = async () => {
      let storageRefreshToken;
      let storageAccessToken;
      try {
        storageAccessToken = await getAccessToken();
        storageRefreshToken = await getRefreshToken();
      } catch (e) {
        console.warn(e);
      }

      console.log(
        `got storage tokens - accessToken: ${storageAccessToken}, refreshToken: ${storageRefreshToken}`,
      );

      if (storageRefreshToken) {
        const {data} = await refreshTokens({
          refreshToken: storageRefreshToken,
        });

        console.log('refreshTokens', data);

        const accessToken = data?.refresh?.accessToken;
        const refreshToken = data?.refresh?.refreshToken;
        if (accessToken && refreshToken) {
          dispatch({type: 'RESTORE_TOKEN', accessToken, refreshToken});
        } else {
          dispatch({type: 'SIGN_OUT'});
        }
      }

      dispatch({type: 'SIGN_OUT'});
    };

    initState();
  }, []);

  const authActions: AuthContextActions = useMemo(
    () => ({
      signIn: async (accessToken: string, refreshToken: string) => {
        await setAccessToken(accessToken);
        await setRefreshToken(refreshToken);

        console.log(
          `tokens stored in storage - accessToken: ${accessToken}, refreshToken: ${refreshToken}`,
        );
        dispatch({type: 'SIGN_IN', accessToken, refreshToken});
      },
      signOut: async () => {
        await removeAccessToken();
        await removeRefreshToken();
        dispatch({type: 'SIGN_OUT'});
      },
    }),
    [],
  );

  return (
    <AuthContext.Provider value={{...state, ...authActions}}>
      {children}
    </AuthContext.Provider>
  );
};
