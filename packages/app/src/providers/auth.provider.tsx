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
  | {type: 'RESTORE_TOKEN'; token?: string | null; refreshToken?: string | null}
  | {type: 'SIGN_IN'; token: string; refreshToken: string}
  | {type: 'SIGN_OUT'};

type AuthPayload = string;

interface AuthState {
  token: string | undefined | null;
  refreshToken: string | undefined | null;
  isLoading: boolean;
  isSignout: boolean;
}

interface AuthContextActions {
  signIn: (token: string, refreshToken: string) => void;
  signOut: () => void;
}

export interface AuthContextType extends AuthState, AuthContextActions {}

export const AuthContext = createContext<AuthContextType>({
  token: null,
  refreshToken: null,
  isLoading: true,
  isSignout: false,
  signIn: () => {},
  signOut: () => {},
});

const AuthReducer = (prevState: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'RESTORE_TOKEN':
      return {
        ...prevState,
        token: action.token,
        refreshToken: action.refreshToken,
        isLoading: false,
        isSignout: false,
      };
    case 'SIGN_IN':
      return {
        ...prevState,
        token: action.token,
        refreshToken: action.refreshToken,
        isLoading: false,
        isSignout: false,
      };
    case 'SIGN_OUT':
      return {
        ...prevState,
        token: null,
        isLoading: false,
        isSignout: true,
      };
  }
};

export const AuthProvider = ({children}: {children: ReactNode}) => {
  const [state, dispatch] = useReducer(AuthReducer, {
    token: null,
    refreshToken: null,
    isLoading: true,
    isSignout: false,
  });

  useEffect(() => {
    const initState = async () => {
      let token;
      let refreshToken;
      try {
        token = await getAccessToken();
        refreshToken = await getRefreshToken();
      } catch (e) {
        console.warn(e);
      }

      // TODO::After restoring token, we may need to validate it in production
      dispatch({type: 'RESTORE_TOKEN', token, refreshToken});
    };

    initState();
  }, []);

  const authActions: AuthContextActions = useMemo(
    () => ({
      signIn: async (token: string, refreshToken: string) => {
        dispatch({type: 'SIGN_IN', token, refreshToken});
        await setAccessToken(token);
        await setRefreshToken(token);
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
