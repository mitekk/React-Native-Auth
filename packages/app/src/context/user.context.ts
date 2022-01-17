import {createContext} from 'react';

export interface AuthPayload {
  token: string;
  user: {
    id: string;
    email: string;
  };
}

export const UserContext = createContext<{
  authPayload: AuthPayload;
  setAuthPayload: (authPayload: AuthPayload) => void;
  logout: () => void;
}>({
  authPayload: {
    token: '',
    user: {
      id: '',
      email: '',
    },
  },
  setAuthPayload: authPayload => {},
  logout: () => {},
});
