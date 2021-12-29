import React from 'react';
import {Controller, useFormContext} from 'react-hook-form';
import {StyleSheet, View} from 'react-native';
import {Input} from 'react-native-elements';
import {DateForm} from './date.form';
import {FieldForm} from './field.form';
import {AllowanceForm} from './allowance.form';

type DetailsFormProps = {};

export const DetailsForm = ({}: DetailsFormProps) => {
  const {
    control,
    formState: {errors},
  } = useFormContext();

  return (
    <View style={style.detailsForm}>
      <View style={style.inputFields}>
        <FieldForm lable="Nickname">
          <Controller
            control={control}
            render={({field: {onChange, value, onBlur}}) => (
              <Input
                value={value}
                onBlur={onBlur}
                onChangeText={value => onChange(value)}
                errorStyle={{color: 'red', alignSelf: 'center'}}
                errorMessage={errors?.nickname?.message}
              />
            )}
            name="nickname"
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
    paddingVertical: 10,
  },
  inputFields: {
    flex: 1,
    justifyContent: 'flex-start',
  },
});
