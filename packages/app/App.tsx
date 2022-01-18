import React from 'react';
import {Routes} from './src/routes';
import {UrqlProvider} from './src/urql';
import {AuthProvider} from './src/utils/auth/auth';

const App = () => {
  return (
    <AuthProvider>
      <UrqlProvider>
        <Routes></Routes>
      </UrqlProvider>
    </AuthProvider>
  );
};

export default App;
