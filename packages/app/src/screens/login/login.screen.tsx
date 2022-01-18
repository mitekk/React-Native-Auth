import {yupResolver} from '@hookform/resolvers/yup';
import React from 'react';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import {StyleSheet, View} from 'react-native';
import {FAB, Input} from 'react-native-elements';
import {gql, useMutation} from 'urql';
import * as yup from 'yup';
import {FieldForm} from '../../components/profile/form/field.form';
import {useAuth} from '../../utils/auth/auth';
import {LoginLayout} from './login.layout';

const login_mut = gql`
  mutation Login($email: String!, $password: String!) {
    login(credentials: {email: $email, password: $password}) {
      errors {
        field
        message
      }
      user {
        id
        createdAt
        updatedAt
        email
      }
      token
    }
  }
`;

const schema = yup.object().shape({
  email: yup
    .string()
    .email('Invalid email format')
    .required('Please Enter a email'),
  password: yup
    .string()
    .required('Please Enter your password')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character',
    ),
});

type LoginInput = {
  email: string;
  password: string;
};

export const LoginScreen = () => {
  const {signIn} = useAuth();
  const [{}, login] = useMutation(login_mut);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<LoginInput>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<LoginInput> = async credentials => {
    const {data} = await login(credentials);
    const token = data?.login?.token;

    if (!token) {
      // TODO:: alert login failed
    } else {
      signIn(token);
    }
  };

  return (
    <LoginLayout title="Bucket" subtitle="The easiest way to manage allowance">
      <View style={styles.body}>
        <View style={{flex: 1}}>
          <FieldForm lable="Email">
            <Controller
              control={control}
              render={({field: {onChange, value, onBlur}}) => (
                <Input
                  autoCapitalize="none"
                  value={value.toString()}
                  onBlur={onBlur}
                  onChangeText={value => onChange(value)}
                  style={{zIndex: 1}}
                  errorStyle={{color: 'red', alignSelf: 'center'}}
                  errorMessage={errors?.email?.message}
                />
              )}
              name="email"
            />
          </FieldForm>
          <FieldForm lable="Password">
            <Controller
              control={control}
              render={({field: {onChange, value, onBlur}}) => (
                <Input
                  autoCapitalize="none"
                  value={value.toString()}
                  onBlur={onBlur}
                  onChangeText={value => onChange(value)}
                  style={{zIndex: 1}}
                  errorStyle={{color: 'red', alignSelf: 'center'}}
                  errorMessage={errors?.password?.message}
                />
              )}
              name="password"
            />
          </FieldForm>
        </View>
        <FAB
          title="Login"
          buttonStyle={styles.createButton}
          onPress={handleSubmit(onSubmit)}></FAB>
      </View>
    </LoginLayout>
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
});
