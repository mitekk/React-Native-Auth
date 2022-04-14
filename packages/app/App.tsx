import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider as PaperProvider} from 'react-native-paper';
import {useFonts} from 'expo-font';
import {AuthProvider} from './src/providers/auth.provider';
import {UrqlProvider} from './src/providers/urql.provider';
import {Routes} from './src/routes';
import {bucketTheme} from './src/theme';
import {SplashScreen} from './src/screens';
import {StoreProvider} from './src/providers/store.provider';

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
    <AuthProvider>
      <UrqlProvider>
        <StoreProvider>
          <SafeAreaProvider>
            <PaperProvider theme={bucketTheme}>
              <Routes />
            </PaperProvider>
          </SafeAreaProvider>
        </StoreProvider>
      </UrqlProvider>
    </AuthProvider>
  );
};

export default App;
