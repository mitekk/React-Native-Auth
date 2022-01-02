import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Avatar} from 'react-native-elements';
import {ImagePickerResponse} from 'react-native-image-picker';

type MediaFormProps = {
  mediaUri: string;
  openMedia: () => void;
};

export const MediaForm = ({mediaUri, openMedia}: MediaFormProps) => {
  return (
    <View style={{...style.mediaFormContainer}}>
      <Avatar
        rounded
        size="xlarge"
        source={{uri: mediaUri}}
        onPress={openMedia}
      />
    </View>
  );
};

const style = StyleSheet.create({
  mediaFormContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
