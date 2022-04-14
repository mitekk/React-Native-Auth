import React, {ReactNode} from 'react';
import {Provider} from 'react-native-paper';
import {bucketTheme} from '../theme';

export const ThemeProvider = ({children}: {children: ReactNode}) => (
  <Provider theme={bucketTheme}>{children}</Provider>
);
