import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider as PaperProvider} from 'react-native-paper';
import {useFonts} from 'expo-font';
import {Routes} from './src/routes';
import {UrqlProvider} from './src/providers/urql.provider';
import {bucketTheme} from './src/theme';
import {SplashScreen} from './src/screens';
import {AuthProvider} from './src/providers/auth.provider';

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
        <SafeAreaProvider>
          <PaperProvider theme={bucketTheme}>
            <Routes />
          </PaperProvider>
        </SafeAreaProvider>
      </UrqlProvider>
    </AuthProvider>
  );
};

export default App;
