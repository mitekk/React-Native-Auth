import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {MainStack, AuthStack} from './types/route.type';

import {
  LoginScreen,
  RegisterScreen,
  PasswordScreen,
  HomeScreen,
  SplashScreen,
} from './screens';
import {useAuth} from './hooks/auth.hook';
// import {useMutation} from 'urql';

export const Routes = () => {
  const {accessToken, isLoading, isSignout} = useAuth();
  console.log('Routes', isLoading, accessToken);

  // useEffect(() => {
  //   if (accessToken && !isSignout) {
  //     const [{}, login] = useMutation(getUser_mutation);
  //   }
  // }, [accessToken]);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      {accessToken ? (
        <MainStack.Navigator>
          <MainStack.Screen name="Home" component={HomeScreen} />
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
