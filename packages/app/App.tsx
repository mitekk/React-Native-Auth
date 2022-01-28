import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider as PaperProvider} from 'react-native-paper';
import {useFonts} from 'expo-font';
import {Routes} from './src/routes';
import {UrqlProvider} from './src/urql';
import {AuthProvider} from './src/utils/auth/auth';
import {bucketTheme} from './src/theme';
import {SplashScreen} from './src/screens';

const App = () => {
  let [fontsLoaded] = useFonts({
    RobotoSlabLight: require('./assets/fonts/RobotoSlab-Light.ttf'),
    RobotoSlabMedium: require('./assets/fonts/RobotoSlab-Medium.ttf'),
    RobotoSlabRegular: require('./assets/fonts/RobotoSlab-Regular.ttf'),
    RobotoSlabThin: require('./assets/fonts/RobotoSlab-Thin.ttf'),
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
