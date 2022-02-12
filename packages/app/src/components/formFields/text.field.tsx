import React from 'react';
import {Control, FieldValues, useController} from 'react-hook-form';
import {TextInputAndroidProps, TextInputIOSProps, View} from 'react-native';
import {TextInput, HelperText, useTheme} from 'react-native-paper';

type TextFieldProps = {
  control: Control<FieldValues, object>;
  label: string;
  name: string;
  textContentType?: TextInputIOSProps['textContentType'];
  autocomplete?: TextInputAndroidProps['autoComplete'];
};

export const TextField = ({
  name,
  control,
  label,
  textContentType,
  autocomplete,
}: TextFieldProps) => {
  const theme = useTheme();
  const {
    field: {onChange, ...field},
    formState: {errors},
  } = useController({
    name,
    control,
    defaultValue: '',
  });
  return (
    <View>
      <TextInput
        {...field}
        activeUnderlineColor={theme?.colors?.nickel}
        autoCapitalize="none"
        autoCorrect={false}
        textContentType={textContentType}
        autoComplete={autocomplete}
        label={label}
        style={{backgroundColor: theme.colors.background}}
        theme={theme}
        onChangeText={value => onChange(value)}
      />
      <HelperText theme={theme} type="error" visible={!!errors?.[name]}>
        {errors?.[name]?.message}
      </HelperText>
    </View>
  );
};
