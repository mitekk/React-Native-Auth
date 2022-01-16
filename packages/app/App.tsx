import React from 'react';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeScreen} from './src/screens/home.screen';
import {RootStackParamList} from './src/types/route.type';
import {ProfileScreen} from './src/screens/profile/profile.screen';
import {ProfileCreateScreen} from './src/screens/profile/profile.update.screen';
import {LoginScreen} from './src/screens/login/login.screen';
import {RegisterScreen} from './src/screens/login/register.screen';
import {PasswordScreen} from './src/screens/login/password.screen';
import {IntoScreen} from './src/screens/login/intro.screen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'Intro'}>
        <Stack.Screen name="Intro" component={IntoScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Password" component={PasswordScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="ProfileCreate" component={ProfileCreateScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});

export default App;
