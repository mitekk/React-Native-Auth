import {createStackNavigator} from '@react-navigation/stack';

export type MainStackParams = {
  Home: undefined;
  Profile: {id: string};
  ProfileEdit: undefined;
};

export type AuthStackParams = {
  Login: undefined;
  Register: undefined;
  Password: undefined;
};

export const MainStack = createStackNavigator<MainStackParams>();
export const AuthStack = createStackNavigator<AuthStackParams>();
