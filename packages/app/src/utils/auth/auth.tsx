import React, {
  createContext,
  ReactNode,
  useReducer,
  useEffect,
  useMemo,
  useContext,
} from 'react';
import {getToken, removeToken, setToken} from './token';

type AuthAction = {type: 'SIGN_IN'; token: string} | {type: 'SIGN_OUT'};

type AuthPayload = string;

interface AuthState {
  token: string | undefined | null;
  status: 'idle' | 'signOut' | 'signIn';
}

interface AuthContextActions {
  signIn: (token: AuthPayload) => void;
  signOut: () => void;
}

interface AuthContextType extends AuthState, AuthContextActions {}

const AuthContext = createContext<AuthContextType>({
  status: 'idle',
  token: null,
  signIn: () => {},
  signOut: () => {},
});

const AuthReducer = (prevState: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'SIGN_IN':
      return {
        ...prevState,
        status: 'signIn',
        token: action.token,
      };
    case 'SIGN_OUT':
      return {
        ...prevState,
        status: 'signOut',
        token: null,
      };
  }
};

export const AuthProvider = ({children}: {children: ReactNode}) => {
  const [state, dispatch] = useReducer(AuthReducer, {
    status: 'idle',
    token: null,
  });

  useEffect(() => {
    const initState = async () => {
      const token = await getToken();
      if (token !== null) {
        dispatch({type: 'SIGN_IN', token});
      } else {
        dispatch({type: 'SIGN_OUT'});
      }
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
        await removeToken(); // TODO: use Vars
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
