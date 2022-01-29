import {yupResolver} from '@hookform/resolvers/yup';
import React from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {StyleSheet} from 'react-native';
import {useTheme} from 'react-native-paper';
import {MainLayout} from '../../../layouts/main.layout';
import {loginSchema} from '../../../utils/validation/schemas';
import {LoginBody} from './login.body';
import {LoginHeader} from './login.header';
import {useLogin} from './login.hook';

export type LoginInput = {
  name: string;
  email: string;
  password: string;
};

const defaultLoginValues: LoginInput = {
  name: '',
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
        header={<LoginHeader />}
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
