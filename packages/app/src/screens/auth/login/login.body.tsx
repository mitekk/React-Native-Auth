import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {useFormContext} from 'react-hook-form';
import {TouchableOpacity, View} from 'react-native';
import {Button, HelperText, Text, useTheme} from 'react-native-paper';
import {PasswordField, TextField} from '../../../components/formFields';
import {UserLoginResponse} from '../../../types/user/response.type';
import {RegisterScreenNavigationProp} from './login.screen';

type LoginBodyProps = {
  onSubmit: () => void;
  data: UserLoginResponse;
};

export const LoginBody = ({onSubmit, data}: LoginBodyProps) => {
  const theme = useTheme();
  const {navigate} = useNavigation<RegisterScreenNavigationProp>();
  const {control} = useFormContext();

  return (
    <View>
      <View>
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
        {data?.login?.errors?.map(({message}) => (
          <HelperText
            style={{
              alignSelf: 'center',
            }}
            theme={theme}
            type="error"
            visible={true}>
            {message}
          </HelperText>
        ))}
        <Button
          theme={theme}
          uppercase={false}
          style={{backgroundColor: theme.colors.anzac, marginVertical: 15}}
          labelStyle={{
            fontFamily: theme.fonts.regular.fontFamily,
            fontSize: 17,
          }}
          onPress={onSubmit}>
          Sign in
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
            Forgot password?{' '}
          </Text>

          <TouchableOpacity
            onPress={() => {
              navigate('Password');
            }}>
            <Text
              style={{
                color: theme.colors.anzac,
                fontFamily: theme?.fonts?.medium?.fontFamily,
                fontSize: 17,
              }}>
              Reset
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
