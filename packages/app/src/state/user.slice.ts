import {createSlice, current, PayloadAction} from '@reduxjs/toolkit';
import {Profile} from '../types/response/user.response.type';
import type {RootState} from './store';

interface UserState {
  id: string;
  name: string;
  email: string;
  verified: boolean;
  profiles: Profile[];
}

const initialState: UserState = {
  id: '',
  name: '',
  email: '',
  verified: false,
  profiles: [],
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      const {id, email, name, verified, profiles} = action.payload;
      state.id = id;
      state.email = email;
      state.name = name;
      state.verified = verified;
      state.profiles = profiles;
    },
  },
});

export const {setUser} = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
