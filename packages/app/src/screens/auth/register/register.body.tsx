import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {useFormContext} from 'react-hook-form';
import {TouchableOpacity, View} from 'react-native';
import {Button, Text, useTheme} from 'react-native-paper';
import {PasswordField, TextField} from '../../../components/formFields';
import {RegisterScreenNavigationProp} from './register.screen';

type RegisterBodyProps = {
  onSubmit: () => void;
};

export const RegisterBody = ({onSubmit}: RegisterBodyProps) => {
  const theme = useTheme();
  const {navigate} = useNavigation<RegisterScreenNavigationProp>();
  const {control} = useFormContext();

  return (
    <View>
      <View>
        <TextField
          name="name"
          control={control}
          label="Name"
          textContentType="name"
          autocomplete="name"
        />

        <TextField
          name="email"
          control={control}
          label="Email"
          textContentType="emailAddress"
          autocomplete="email"
        />

        <PasswordField
          name="password"
          control={control}
          label="Password"
          textContentType="newPassword"
          autocomplete="password"
        />
      </View>
      <View
        style={{
          justifyContent: 'space-around',
          paddingVertical: 15,
        }}>
        <Button
          theme={theme}
          uppercase={false}
          style={{backgroundColor: theme.colors.anzac, marginVertical: 15}}
          labelStyle={{
            fontFamily: theme.fonts.regular.fontFamily,
            fontSize: 17,
          }}
          onPress={onSubmit}>
          Sign up
        </Button>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              alignSelf: 'center',
              marginVertical: 15,
              fontSize: 16,
            }}>
            Have an account?{' '}
          </Text>

          <TouchableOpacity
            onPress={() => {
              navigate('Login');
            }}>
            <Text
              style={{
                color: theme.colors.anzac,
                fontFamily: theme?.fonts?.medium?.fontFamily,
                fontSize: 17,
              }}>
              Sign in
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
