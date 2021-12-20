import {CompositeNavigationProp} from '@react-navigation/core';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {StackNavigationProp} from '@react-navigation/stack';

export type RootStackParamList = {
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

export type ProfileScreenNavigation = StackNavigationProp<RootStackParamList>;
