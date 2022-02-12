import React, {useState} from 'react';
import {Control, FieldValues, useController} from 'react-hook-form';
import {TextInputAndroidProps, TextInputIOSProps, View} from 'react-native';
import {TextInput, HelperText, useTheme} from 'react-native-paper';

type PasswordFieldProps = {
  control: Control<FieldValues, object>;
  label: string;
  name: string;
  textContentType?: TextInputIOSProps['textContentType'];
  autocomplete?: TextInputAndroidProps['autoComplete'];
};

export const PasswordField = ({
  name,
  control,
  ...passwordFieldProps
}: PasswordFieldProps) => {
  const [passwordSecured, setPasswordSecured] = useState(false);
  const theme = useTheme();
  const {
    field: {onChange, onBlur, ...field},
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
        {...passwordFieldProps}
        activeUnderlineColor={theme?.colors?.nickel}
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry={!passwordSecured}
        style={{backgroundColor: theme.colors.background}}
        theme={theme}
        onChangeText={value => onChange(value)}
        onBlur={() => {
          setPasswordSecured(false);
          onBlur();
        }}
        right={
          <TextInput.Icon
            color={theme.colors.anzac}
            theme={theme}
            name="eye"
            onPress={() => setPasswordSecured(!passwordSecured)}
          />
        }
      />
      <HelperText theme={theme} type="error" visible={!!errors?.[name]}>
        {errors?.[name]?.message}
      </HelperText>
    </View>
  );
};
