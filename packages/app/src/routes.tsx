import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from './types/route.type';
import {Urql} from './urql';
import {
  IntoScreen,
  LoginScreen,
  RegisterScreen,
  PasswordScreen,
  HomeScreen,
  ProfileScreen,
  ProfileCreateScreen,
} from './screens';

const {Navigator, Screen} = createNativeStackNavigator<RootStackParamList>();

export const Routes = () => (
  <Urql.Provider value={Urql.client}>
    <NavigationContainer>
      <Navigator
        initialRouteName={'Register'}
        screenOptions={{
          headerShown: true,
        }}>
        <Screen name="Intro" component={IntoScreen} />
        <Screen name="Login" component={LoginScreen} />
        <Screen name="Register" component={RegisterScreen} />
        <Screen name="Password" component={PasswordScreen} />
        <Screen name="Home" component={HomeScreen} />
        <Screen name="Profile" component={ProfileScreen} />
        <Screen name="ProfileCreate" component={ProfileCreateScreen} />
      </Navigator>
    </NavigationContainer>
  </Urql.Provider>
);
