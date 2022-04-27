import {createSlice, current, PayloadAction} from '@reduxjs/toolkit';
import type {RootState} from './store';

interface UserState {
  id: string;
  name: string;
  email: string;
  verified: boolean;
}

const initialState: UserState = {
  id: '',
  name: '',
  email: '',
  verified: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      const {id, email, name, verified} = action.payload;
      state.id = id;
      state.email = email;
      state.name = name;
      state.verified = verified;
    },
  },
});

export const {setUser} = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
