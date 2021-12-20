import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-elements';

type FieldFormProps = {
  lable: string;
  children: JSX.Element;
};

export const FieldForm = ({children, lable}: FieldFormProps) => {
  return (
    <View>
      <Text style={style.label}>{lable}</Text>
      {children}
    </View>
  );
};

const style = StyleSheet.create({
  label: {
    paddingHorizontal: 10,
    paddingTop: 10,
  },
});
