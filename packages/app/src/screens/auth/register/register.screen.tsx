import {yupResolver} from '@hookform/resolvers/yup';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {StyleSheet} from 'react-native';
import {useTheme} from 'react-native-paper';
import {LoginLayout} from '../../../layouts/login.layout';
import {AuthStackParams} from '../../../types/route.type';
import {registerSchema} from '../../../utils/validation/schemas';
import {AuthHeader} from '../components/header.login';
import {RegisterBody} from './register.body';
import {useRegister} from './register.hook';

export type RegisterScreenNavigationProp = NativeStackNavigationProp<
  AuthStackParams,
  'Register'
>;

export type RegisterInput = {
  name: string;
  email: string;
  password: string;
};

const defaultLoginValues: RegisterInput = {
  name: '',
  email: '',
  password: '',
};

export const RegisterScreen = () => {
  const {onSubmit} = useRegister();
  const {colors} = useTheme();
  const methods = useForm<RegisterInput>({
    resolver: yupResolver(registerSchema),
    defaultValues: defaultLoginValues,
  });

  return (
    <FormProvider {...methods}>
      <LoginLayout
        header={<AuthHeader />}
        headerStyle={{...styles.headerStyle, backgroundColor: colors.roseWhite}}
        showBack={false}>
        <RegisterBody onSubmit={methods.handleSubmit(onSubmit)} />
      </LoginLayout>
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
