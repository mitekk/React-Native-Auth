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
      accessToken?: string | null;
      refreshToken?: string | null;
    }
  | {type: 'SIGN_IN'; accessToken: string; refreshToken: string}
  | {type: 'SIGN_OUT'};

export interface AuthState {
  accessToken: string | undefined | null;
  refreshToken: string | undefined | null;
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
        accessToken: action.accessToken,
        refreshToken: action.refreshToken,
        isLoading: false,
        isSignout: false,
      };
    case 'SIGN_IN':
      return {
        ...prevState,
        accessToken: action.accessToken,
        refreshToken: action.refreshToken,
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
  const [state, dispatch] = useReducer(AuthReducer, {
    accessToken: null,
    refreshToken: null,
    isLoading: true,
    isSignout: false,
  });

  useEffect(() => {
    const initState = async () => {
      let accessToken;
      let refreshToken;
      try {
        accessToken = await getAccessToken();
        refreshToken = await getRefreshToken();
      } catch (e) {
        console.warn(e);
      }

      // TODO::After restoring token, we may need to validate it in production
      dispatch({type: 'RESTORE_TOKEN', accessToken, refreshToken});
    };

    initState();
  }, []);

  const authActions: AuthContextActions = useMemo(
    () => ({
      signIn: async (accessToken: string, refreshToken: string) => {
        dispatch({type: 'SIGN_IN', accessToken, refreshToken});
        await setAccessToken(accessToken);
        await setRefreshToken(refreshToken);
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
