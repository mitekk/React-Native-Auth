import React from 'react';
import {StyleSheet, View} from 'react-native';
import {AvatarList} from '../components/profile/list/avatar.list';
import {PROFILES} from '../mock';

export const HomeScreen = () => {
  return (
    <View>
      <AvatarList profiles={PROFILES} />
    </View>
  );
};

const style = StyleSheet.create({});
