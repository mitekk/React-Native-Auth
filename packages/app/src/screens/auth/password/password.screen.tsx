import {yupResolver} from '@hookform/resolvers/yup';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import {StyleSheet, View} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import * as yup from 'yup';
import {FieldForm} from '../../../components/profile/form/field.form';
import {MainLayout} from '../../../layouts/main.layout';
import {RootScreenNavigation} from '../../../types/route.type';

const schema = yup.object().shape({
  email: yup
    .string()
    .email('Invalid email format')
    .required('Please Enter a email'),
});

type PasswordInput = {
  email: string;
};

export const PasswordScreen = () => {
  const navigation = useNavigation<RootScreenNavigation>();

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<PasswordInput>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit: SubmitHandler<PasswordInput> = data => {
    navigation.navigate('Home');
  };

  return (
    <MainLayout></MainLayout>
    // <LoginLayout title="Bucket" subtitle="The easiest way to manage allowance">
    //   <View style={styles.body}>
    //     <View style={{flex: 1}}>
    //       <FieldForm lable="Email">
    //         <Controller
    //           control={control}
    //           render={({field: {onChange, value, onBlur}}) => (
    //             <TextInput
    //               autoCapitalize="none"
    //               value={value.toString()}
    //               onBlur={onBlur}
    //               onChangeText={value => onChange(value)}
    //               style={{zIndex: 1}}
    //             />
    //           )}
    //           name="email"
    //         />
    //       </FieldForm>
    //     </View>
    //     <Button style={styles.createButton} onPress={handleSubmit(onSubmit)}>
    //       Send Email
    //     </Button>
    //   </View>
    // </LoginLayout>
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
