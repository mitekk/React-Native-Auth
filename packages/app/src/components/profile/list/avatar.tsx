import React from 'react';
import {Avatar as RNAvatar} from 'react-native-elements';
import {StyleSheet, View} from 'react-native';

type AvatarProps = {
  name: string;
  onPress: () => void;
};

export const Avatar = ({name, onPress}: AvatarProps) => {
  return (
    <View style={style.container}>
      <RNAvatar
        size="medium"
        overlayContainerStyle={style.overlayContainerStyle}
        rounded
        title={name}
        onPress={onPress}
      />
    </View>
  );
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
