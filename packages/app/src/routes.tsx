import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {MainStack, AuthStack} from './types/route.type';

import {
  LoginScreen,
  RegisterScreen,
  PasswordScreen,
  HomeScreen,
  ProfileScreen,
  ProfileCreateScreen,
  SplashScreen,
} from './screens';
import {useAuth} from './utils/auth/auth';

export const Routes = () => {
  const {token, isLoading} = useAuth();

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      {token ? (
        <MainStack.Navigator>
          <MainStack.Screen name="Home" component={HomeScreen} />
          <MainStack.Screen name="Profile" component={ProfileScreen} />
          <MainStack.Screen
            name="ProfileEdit"
            component={ProfileCreateScreen}
          />
        </MainStack.Navigator>
      ) : (
        <AuthStack.Navigator screenOptions={{headerShown: false}}>
          <AuthStack.Screen name="Register" component={RegisterScreen} />
          <AuthStack.Screen name="Login" component={LoginScreen} />
          <AuthStack.Screen name="Password" component={PasswordScreen} />
        </AuthStack.Navigator>
      )}
    </NavigationContainer>
  );
};
