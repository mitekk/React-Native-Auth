import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useTheme, Text} from 'react-native-paper';

export const LoginHeader = () => {
  const {colors, fonts} = useTheme();

  return (
    <View>
      <Text
        style={[
          headerStyles.title,
          {fontFamily: fonts.header.fontFamily, color: colors.anzac},
        ]}>
        POCKET
      </Text>
      <Text
        style={[headerStyles.subTitle, {fontFamily: fonts.header.fontFamily}]}>
        let's start
      </Text>
    </View>
  );
};

const headerStyles = StyleSheet.create({
  title: {alignSelf: 'center', fontSize: 60},
  subTitle: {alignSelf: 'center', fontSize: 20},
});
