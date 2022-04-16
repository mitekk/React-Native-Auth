import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {useFonts} from 'expo-font';
import {AuthProvider} from './src/providers/auth.provider';
import {UrqlProvider} from './src/providers/urql.provider';
import {Routes} from './src/routes';

import {SplashScreen} from './src/screens';
import {StoreProvider} from './src/providers/store.provider';
import {ThemeProvider} from './src/providers/theme.provider';

const App = () => {
  let [fontsLoaded] = useFonts({
    RobotoSlabRegular: require('./assets/fonts/RobotoSlab-Regular.ttf'),
    RobotoLight: require('./assets/fonts/Roboto-Light.ttf'),
    RobotoMedium: require('./assets/fonts/Roboto-Medium.ttf'),
    RobotoRegular: require('./assets/fonts/Roboto-Regular.ttf'),
    RobotoThin: require('./assets/fonts/Roboto-Thin.ttf'),
  });

  if (!fontsLoaded) {
    return <SplashScreen />;
  }

  return (
    <UrqlProvider>
      <AuthProvider>
        <StoreProvider>
          <SafeAreaProvider>
            <ThemeProvider>
              <Routes />
            </ThemeProvider>
          </SafeAreaProvider>
        </StoreProvider>
      </AuthProvider>
    </UrqlProvider>
  );
};

export default App;
