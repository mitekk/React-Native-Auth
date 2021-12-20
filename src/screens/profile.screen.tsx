import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ProfileProps} from '../types/route.type';

export const ProfileScreen = ({route}: ProfileProps) => {
  const {id} = route.params;
  return (
    <View>
      <Text>Profile {id}</Text>
    </View>
  );
};

const style = StyleSheet.create({});
