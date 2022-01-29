import React, {
  createContext,
  ReactNode,
  useReducer,
  useEffect,
  useMemo,
  useContext,
} from 'react';
import {getToken, removeToken, setToken} from './token';

type AuthAction =
  | {type: 'RESTORE_TOKEN'; token?: string | null}
  | {type: 'SIGN_IN'; token: string}
  | {type: 'SIGN_OUT'};

type AuthPayload = string;

interface AuthState {
  token: string | undefined | null;
  isLoading: boolean;
  isSignout: boolean;
}

interface AuthContextActions {
  signIn: (token: AuthPayload) => void;
  signOut: () => void;
}

interface AuthContextType extends AuthState, AuthContextActions {}

const AuthContext = createContext<AuthContextType>({
  token: null,
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
        isLoading: false,
      };
    case 'SIGN_IN':
      return {
        ...prevState,
        isSignout: false,
        token: action.token,
      };
    case 'SIGN_OUT':
      return {
        ...prevState,
        isSignout: true,
        token: null,
      };
  }
};

export const AuthProvider = ({children}: {children: ReactNode}) => {
  const [state, dispatch] = useReducer(AuthReducer, {
    token: null,
    isLoading: true,
    isSignout: false,
  });

  useEffect(() => {
    const initState = async () => {
      let token;
      try {
        token = await getToken();
      } catch (e) {
        // Restoring token failed
      }

      // TODO::After restoring token, we may need to validate it in production
      dispatch({type: 'RESTORE_TOKEN', token});
    };

    initState();
  }, []);

  const authActions: AuthContextActions = useMemo(
    () => ({
      signIn: async (token: string) => {
        dispatch({type: 'SIGN_IN', token});
        await setToken(token);
      },
      signOut: async () => {
        await removeToken();
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

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be inside an AuthProvider with a value');
  }
  return context;
};
