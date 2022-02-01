import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {MainStackParams} from '../../types/route.type';
import {RouteProp} from '@react-navigation/native';

type ProfileScreenRouteProp = RouteProp<MainStackParams, 'Profile'>;

export const ProfileScreen = ({params}: ProfileScreenRouteProp) => {
  const {id} = params;
  return (
    <View>
      <Text>Profile {id}</Text>
    </View>
  );
};

const style = StyleSheet.create({});
