import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {StackNavigationProp} from '@react-navigation/stack';

export type RootStackParamList = {
  Intro: undefined;
  Login: undefined;
  Register: undefined;
  Password: undefined;

  Home: undefined;
  Profile: {
    id: number;
  };
  ProfileCreate: undefined;
};

export type ProfileProps = NativeStackScreenProps<
  RootStackParamList,
  'Profile'
>;

export type RootScreenNavigation = StackNavigationProp<RootStackParamList>;
