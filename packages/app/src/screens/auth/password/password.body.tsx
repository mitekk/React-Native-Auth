import React from 'react';
import {useFormContext} from 'react-hook-form';
import {View} from 'react-native';
import {Button, HelperText, useTheme} from 'react-native-paper';
import {TextField} from '../../../components/formFields';
import {AuthResetPasswordResponse} from '../../../types/response/auth.response.type';

type PasswordBodyProps = {
  onSubmit: () => void;
  data: AuthResetPasswordResponse;
};

export const PasswordBody = ({onSubmit, data}: PasswordBodyProps) => {
  const theme = useTheme();
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
      </View>
      <View
        style={{
          justifyContent: 'space-around',
          paddingVertical: 15,
        }}>
        <HelperText
          style={{
            alignSelf: 'center',
          }}
          theme={theme}
          type="info"
          visible={!!data?.sendResetPasswordEmail?.message}>
          {data?.sendResetPasswordEmail?.message}
        </HelperText>
        <Button
          theme={theme}
          uppercase={false}
          style={{backgroundColor: theme.colors.anzac, marginVertical: 15}}
          labelStyle={{
            fontFamily: theme.fonts.regular.fontFamily,
            fontSize: 17,
          }}
          onPress={onSubmit}>
          Send email
        </Button>
      </View>
    </View>
  );
};
