import {yupResolver} from '@hookform/resolvers/yup';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import {StyleSheet, View} from 'react-native';
import {FAB, Input} from 'react-native-elements';
import * as yup from 'yup';
import {FieldForm} from '../../components/profile/form/field.form';
import {RootScreenNavigation} from '../../types/route.type';
import {LoginLayout} from './login.layout';

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
  const navigation = useNavigation<RootScreenNavigation>();

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

  const onSubmit: SubmitHandler<LoginInput> = data => {
    navigation.navigate('Home');
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
