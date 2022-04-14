import React, {ReactNode} from 'react';
import {Provider} from 'react-redux';
import store from '../state/store';

export const StoreProvider = ({children}: {children: ReactNode}) => (
  <Provider store={store}>{children}</Provider>
);
