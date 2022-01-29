import {yupResolver} from '@hookform/resolvers/yup';
import React from 'react';
import {FormProvider, SubmitHandler, useForm} from 'react-hook-form';
import {StyleSheet} from 'react-native';
import {useTheme} from 'react-native-paper';
import {useMutation} from 'urql';
import {login_mutation} from '../../../api/schemas';
import {MainLayout} from '../../../layouts/main.layout';
import {useAuth} from '../../../utils/auth/auth';
import {loginSchema} from '../../../utils/validation/schemas';
import {LoginBody} from './login.body';
import {LoginHeader} from './login.header';

type LoginInput = {
  name: string;
  email: string;
  password: string;
};

const defaultValues: LoginInput = {
  name: '',
  email: '',
  password: '',
};

export const LoginScreen = () => {
  const {signIn} = useAuth();
  const [{}, login] = useMutation(login_mutation);
  const {colors} = useTheme();
  const methods = useForm<LoginInput>({
    resolver: yupResolver(loginSchema),
    defaultValues,
  });

  const onSubmit: SubmitHandler<LoginInput> = async credentials => {
    console.log(credentials);

    // const {data} = await login(credentials);
    // const token = data?.login?.token;

    // if (!token) {
    //   // TODO:: alert login failed
    // } else {
    //   signIn(token);
    // }
  };

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
