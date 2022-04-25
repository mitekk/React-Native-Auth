import {createSlice, PayloadAction} from '@reduxjs/toolkit';
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
  name: 'counter',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state = {...state, ...action.payload};
    },
  },
});

export const {setUser} = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
