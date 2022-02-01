import React from 'react';
import {Controller, useFormContext} from 'react-hook-form';
import {View} from 'react-native';
import {Button, HelperText, TextInput, useTheme} from 'react-native-paper';

type PasswordBodyProps = {
  onSubmit: () => void;
};

export const PasswordBody = ({onSubmit}: PasswordBodyProps) => {
  const theme = useTheme();
  const {
    control,
    formState: {errors},
  } = useFormContext();

  return (
    <View>
      <View>
        <Controller
          control={control}
          render={({field: {onChange, value, onBlur}}) => (
            <View>
              <TextInput
                activeUnderlineColor={theme?.colors?.nickel}
                autoCapitalize="none"
                autoCorrect={false}
                textContentType="emailAddress"
                autoComplete="email"
                label={'Email'}
                value={value}
                onBlur={onBlur}
                onChangeText={value => onChange(value)}
                style={{backgroundColor: theme.colors.background}}
                theme={theme}
              />
              <HelperText theme={theme} type="error" visible={!!errors?.email}>
                {errors?.email?.message}
              </HelperText>
            </View>
          )}
          name="email"
        />
      </View>
      <View
        style={{
          justifyContent: 'space-around',
          paddingVertical: 15,
        }}>
        <Button
          theme={theme}
          style={{backgroundColor: theme.colors.anzac, marginVertical: 15}}
          labelStyle={{fontFamily: theme.fonts.regular.fontFamily}}
          onPress={onSubmit}>
          Send email
        </Button>
      </View>
    </View>
  );
};
