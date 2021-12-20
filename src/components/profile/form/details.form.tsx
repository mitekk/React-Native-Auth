import React from 'react';
import {Controller, useFormContext} from 'react-hook-form';
import {StyleSheet, View} from 'react-native';
import {Input} from 'react-native-elements';
import {BirthdayForm} from './birthday.form';

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
            rules={{
              required: true,
            }}
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
        <FieldForm lable="Birthday">
          <BirthdayForm date={new Date()} />
        </FieldForm>
        <FieldForm lable="Allowance">
          <AllowanceForm></AllowanceForm>
        </FieldForm>
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
