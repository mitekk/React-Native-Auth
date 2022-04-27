import {configureStore} from '@reduxjs/toolkit';
import devToolsEnhancer from 'remote-redux-devtools';
import userReducer from './user.slice';

const store = configureStore({
  reducer: {
    user: userReducer,
  },
  devTools: true,
  enhancers: [
    devToolsEnhancer({realtime: false, port: 8081, hostname: 'localhost'}),
  ],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
