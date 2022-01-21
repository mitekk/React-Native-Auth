import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from './types/route.type';

import {
  IntoScreen,
  LoginScreen,
  RegisterScreen,
  PasswordScreen,
  HomeScreen,
  ProfileScreen,
  ProfileCreateScreen,
  SplashScreen,
} from './screens';
import {useAuth} from './utils/auth/auth';
import {Theme} from './theme';
import {useRouteState} from './routes.state';

const {Navigator, Screen} = createNativeStackNavigator<RootStackParamList>();

export const Routes = () => {
  const {token, isLoading} = useAuth();
  const {isReady, initialState, setState} = useRouteState();

  if (isLoading && !isReady) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer
      theme={Theme}
      initialState={initialState}
      onStateChange={state => setState(state)}>
      {token ? (
        <Navigator
          initialRouteName={'Home'}
          screenOptions={{
            headerShown: true,
          }}>
          <Screen name="Home" component={HomeScreen} />
          <Screen name="Profile" component={ProfileScreen} />
          <Screen name="ProfileCreate" component={ProfileCreateScreen} />
        </Navigator>
      ) : (
        <Navigator
          initialRouteName={'Intro'}
          screenOptions={{
            headerShown: false,
          }}>
          <Screen name="Intro" component={IntoScreen} />
          <Screen name="Login" component={LoginScreen} />
          <Screen name="Register" component={RegisterScreen} />
          <Screen name="Password" component={PasswordScreen} />
        </Navigator>
      )}
    </NavigationContainer>
  );
};
