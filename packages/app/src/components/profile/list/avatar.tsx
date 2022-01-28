import React from 'react';
import {StyleSheet, View} from 'react-native';

type AvatarProps = {
  name: string;
  onPress: () => void;
};

export const Avatar = ({name, onPress}: AvatarProps) => {
  return <View style={style.container}></View>;
};

const style = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
  },
  overlayContainerStyle: {
    backgroundColor: '#000111',
  },
});
