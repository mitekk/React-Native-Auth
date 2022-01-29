import React from 'react';
import {StyleProp, StyleSheet, TextStyle, View, ViewStyle} from 'react-native';
import {Text} from 'react-native-paper';

type FieldFormProps = {
  lable: string;
  children: JSX.Element;
  action?: JSX.Element;
  containerStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
};

export const FieldForm = ({
  children,
  lable,
  action,
  containerStyle,
  labelStyle,
}: FieldFormProps) => {
  return (
    <View style={containerStyle}>
      <View style={style.header}>
        <Text style={labelStyle}>{lable}</Text>
        {action}
      </View>
      {children}
    </View>
  );
};

const style = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
