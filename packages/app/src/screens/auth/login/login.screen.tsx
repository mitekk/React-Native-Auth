import {yupResolver} from '@hookform/resolvers/yup';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {StyleSheet} from 'react-native';
import {useTheme} from 'react-native-paper';
import {MainLayout} from '../../../layouts/main.layout';
import {AuthStackParams} from '../../../types/route.type';
import {loginSchema} from '../../../utils/validation/schemas';
import {AuthHeader} from '../components/header.login';
import {LoginBody} from './login.body';
import {useLogin} from './login.hook';

export type RegisterScreenNavigationProp = NativeStackNavigationProp<
  AuthStackParams,
  'Login'
>;

export type LoginInput = {
  email: string;
  password: string;
};

const defaultLoginValues: LoginInput = {
  email: '',
  password: '',
};

export const LoginScreen = () => {
  const {onSubmit} = useLogin();
  const {colors} = useTheme();
  const methods = useForm<LoginInput>({
    resolver: yupResolver(loginSchema),
    defaultValues: defaultLoginValues,
  });

  return (
    <FormProvider {...methods}>
      <MainLayout
        header={<AuthHeader />}
        headerStyle={{...styles.headerStyle, backgroundColor: colors.roseWhite}}
        showBack={false}>
        <LoginBody onSubmit={methods.handleSubmit(onSubmit)} />
      </MainLayout>
    </FormProvider>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 3,
    paddingVertical: 20,
    marginHorizontal: 50,
    marginVertical: 50,
  },
  headerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
