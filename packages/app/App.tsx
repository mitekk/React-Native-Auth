import React from 'react';
import {Routes} from './src/routes';
import {RouteStateProvider} from './src/routes.state';
import {UrqlProvider} from './src/urql';
import {AuthProvider} from './src/utils/auth/auth';

const App = () => {
  return (
    <AuthProvider>
      <UrqlProvider>
        <RouteStateProvider>
          <Routes></Routes>
        </RouteStateProvider>
      </UrqlProvider>
    </AuthProvider>
  );
};

export default App;
