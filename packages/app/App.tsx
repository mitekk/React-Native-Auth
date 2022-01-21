import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Routes} from './src/routes';
import {UrqlProvider} from './src/urql';
import {AuthProvider} from './src/utils/auth/auth';

const App = () => {
  return (
    <AuthProvider>
      <UrqlProvider>
        <SafeAreaProvider>
          <Routes />
        </SafeAreaProvider>
      </UrqlProvider>
    </AuthProvider>
  );
};

export default App;
