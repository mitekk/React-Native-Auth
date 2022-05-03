import React, {
  createContext,
  ReactNode,
  useReducer,
  useEffect,
  useMemo,
} from 'react';
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
  signIn: (accessToken: string, refreshToken: string) => Promise<void>;
  signOut: () => Promise<void>;
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
  const [state, dispatch] = useReducer(AuthReducer, {
    accessToken: null,
    refreshToken: null,
    isLoading: true,
    isSignedIn: true,
  });

  useEffect(() => {
    const initState = async () => {
      try {
        const storageAccessToken = await getAccessToken();
        const storageRefreshToken = await getRefreshToken();

        if (storageAccessToken && storageRefreshToken) {
          dispatch({
            type: 'RESTORE_TOKEN',
            accessToken: storageAccessToken,
            refreshToken: storageRefreshToken,
          });
        } else {
          dispatch({type: 'SIGN_OUT'});
        }
      } catch (e) {
        console.warn(e);
      }
    };

    initState();
  }, []);

  const authActions: AuthContextActions = useMemo(
    () => ({
      signIn: async (accessToken: string, refreshToken: string) => {
        await setAccessToken(accessToken);
        await setRefreshToken(refreshToken);
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
