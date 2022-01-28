import React from 'react';
import {Controller, useFormContext} from 'react-hook-form';
import {StyleSheet, View} from 'react-native';
import {DateForm} from './date.form';
import {FieldForm} from './field.form';
import {AllowanceForm} from './allowance.form';
import {TextInput} from 'react-native-paper';

type DetailsFormProps = {};

export const DetailsForm = ({}: DetailsFormProps) => {
  const {
    control,
    formState: {errors},
  } = useFormContext();

  return (
    <View style={style.detailsForm}>
      <View style={style.inputFields}>
        <FieldForm lable="Name">
          <Controller
            control={control}
            render={({field: {onChange, value, onBlur}}) => (
              <TextInput
                value={value}
                onBlur={onBlur}
                onChangeText={value => onChange(value)}
              />
            )}
            name="name"
          />
        </FieldForm>
        <DateForm name="birthdate" label="Birthdate" />
        <AllowanceForm />
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  detailsForm: {
    flex: 3,
    paddingHorizontal: 50,
    marginVertical: 20,
  },
  inputFields: {
    flex: 1,
    justifyContent: 'flex-start',
  },
});
