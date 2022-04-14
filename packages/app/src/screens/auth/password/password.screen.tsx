import {yupResolver} from '@hookform/resolvers/yup';
import React from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {StyleSheet} from 'react-native';
import {useTheme} from 'react-native-paper';
import {LoginLayout} from '../../../layouts/login.layout';
import {passwordSchema} from '../../../utils/validation/password.validation';
import {AuthHeader} from '../components/header.login';
import {PasswordBody} from './password.body';
import {usePassword} from './password.hook';

export type PasswordInput = {
  email: string;
};

const defaultLoginValues: PasswordInput = {
  email: '',
};

export const PasswordScreen = () => {
  const {colors} = useTheme();
  const {data, onSubmit} = usePassword();
  const methods = useForm<PasswordInput>({
    resolver: yupResolver(passwordSchema),
    defaultValues: defaultLoginValues,
  });

  return (
    <FormProvider {...methods}>
      <LoginLayout
        header={<AuthHeader />}
        headerStyle={{...styles.headerStyle, backgroundColor: colors.roseWhite}}
        showBack>
        <PasswordBody onSubmit={methods.handleSubmit(onSubmit)} data={data} />
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
