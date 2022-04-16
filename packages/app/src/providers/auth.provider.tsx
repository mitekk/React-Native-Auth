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
  isSignout: boolean;
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
  isSignout: false,
  signIn: async () => {},
  signOut: async () => {},
});

const AuthReducer = (prevState: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'RESTORE_TOKEN':
      return {
        ...prevState,
        accessToken: action?.accessToken || null,
        refreshToken: action?.refreshToken || null,
        isLoading: false,
        isSignout: false,
      };
    case 'SIGN_IN':
      return {
        ...prevState,
        accessToken: action?.accessToken || null,
        refreshToken: action?.refreshToken || null,
        isLoading: false,
        isSignout: false,
      };
    case 'SIGN_OUT':
      return {
        ...prevState,
        accessToken: null,
        refreshToken: null,
        isLoading: false,
        isSignout: true,
      };
  }
};

export const AuthProvider = ({children}: {children: ReactNode}) => {
  const [{}, refreshTokens] = useMutation(refreshToken_mutation);
  const [state, dispatch] = useReducer(AuthReducer, {
    accessToken: null,
    refreshToken: null,
    isLoading: true,
    isSignout: false,
  });

  useEffect(() => {
    const initState = async () => {
      let storageRefreshToken;
      let storageAccessToken;
      try {
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

        const accessToken = data?.refresh?.accessToken;
        const refreshToken = data?.refresh?.refreshToken;
        if (accessToken && refreshToken) {
          dispatch({type: 'RESTORE_TOKEN', accessToken, refreshToken});
        }
      }

      dispatch({type: 'SIGN_OUT'});
    };

    initState();
  }, []);

  const authActions: AuthContextActions = useMemo(
    () => ({
      signIn: async (accessToken: string, refreshToken: string) => {
        dispatch({type: 'SIGN_IN', accessToken, refreshToken});
        await setAccessToken(accessToken);
        await setRefreshToken(refreshToken);

        console.log(
          `tokens stored on storage - accessToken: ${accessToken}, refreshToken: ${refreshToken}`,
        );
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
