import {yupResolver} from '@hookform/resolvers/yup';
import React from 'react';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import {StyleSheet, Text, View} from 'react-native';
import {useTheme} from 'react-native-paper';
import {gql, useMutation} from 'urql';
import * as yup from 'yup';
import {MainLayout} from '../../layouts/main.layout';
import {useAuth} from '../../utils/auth/auth';

const headerStyles = StyleSheet.create({
  title: {},
  subTitle: {},
});

const header = (
  <View>
    <Text style={headerStyles.title}>bucket</Text>
    <Text style={headerStyles.subTitle}>lets start</Text>
  </View>
);

export const LoginScreen = () => {
  const {colors, fonts} = useTheme();
  console.log(fonts);

  return (
    <MainLayout
      header={header}
      headerStyle={{...styles.headerStyle, backgroundColor: colors.flamingo}}
      showBack={false}>
      <Text style={{fontSize: 50, fontFamily: fonts.thin.fontFamily}}>aaa</Text>
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 3,
    paddingVertical: 20,
    marginHorizontal: 50,
    marginVertical: 50,
  },
  createButton: {backgroundColor: 'navy'},
  headerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
