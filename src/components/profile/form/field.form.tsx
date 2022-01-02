import React from 'react';
import {StyleProp, StyleSheet, TextStyle, View, ViewStyle} from 'react-native';
import {Text} from 'react-native-elements';

type FieldFormProps = {
  lable: string;
  children: JSX.Element;
  action?: JSX.Element;
  style?: StyleProp<TextStyle | ViewStyle>;
};

export const FieldForm = ({
  children,
  lable,
  action,
  style: styleFromParent,
}: FieldFormProps) => {
  return (
    <View style={(style.field, styleFromParent)}>
      <View style={style.header}>
        <Text style={(style.label, styleFromParent)}>{lable}</Text>
        {action}
      </View>
      {children}
    </View>
  );
};

const style = StyleSheet.create({
  field: {},
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    paddingTop: 10,
  },
});
