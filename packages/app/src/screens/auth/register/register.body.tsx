import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {useFormContext} from 'react-hook-form';
import {TouchableOpacity, View} from 'react-native';
import {Button, HelperText, Text, useTheme} from 'react-native-paper';
import {PasswordField, TextField} from '../../../components/formFields';
import {AuthRegisterResponse} from '../../../types/user/response.type';
import {RegisterScreenNavigationProp} from './register.screen';

type RegisterBodyProps = {
  onSubmit: () => void;
  data: AuthRegisterResponse;
};

export const RegisterBody = ({onSubmit, data}: RegisterBodyProps) => {
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
        {data?.register?.errors?.map(({message}, index) => (
          <HelperText
            key={`${index}: ${message}`}
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
