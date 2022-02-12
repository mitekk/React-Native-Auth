import React from 'react';
import {useFormContext} from 'react-hook-form';
import {View} from 'react-native';
import {Button, useTheme} from 'react-native-paper';
import {TextField} from '../../../components/formFields';

type PasswordBodyProps = {
  onSubmit: () => void;
};

export const PasswordBody = ({onSubmit}: PasswordBodyProps) => {
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
