import {yupResolver} from '@hookform/resolvers/yup';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import {StyleSheet, View} from 'react-native';
import {FAB, Input} from 'react-native-elements';
import {gql, useMutation} from 'urql';
import * as yup from 'yup';
import {FieldForm} from '../../components/profile/form/field.form';
import {RootScreenNavigation} from '../../types/route.type';
import {useAuth} from '../../utils/auth/auth';
import {LoginLayout} from './login.layout';

const register_mut = gql`
  mutation Register($email: String!, $password: String!) {
    register(credentials: {email: $email, password: $password}) {
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

type RegisterInput = {
  email: string;
  password: string;
};

export const RegisterScreen = () => {
  const navigation = useNavigation<RootScreenNavigation>();
  const {signIn} = useAuth();
  const [{}, register] = useMutation(register_mut);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<RegisterInput>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<RegisterInput> = async credentials => {
    const {data} = await register(credentials);
    const token = data?.register?.token;

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
                  secureTextEntry={true}
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
          title="Sign Up"
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
