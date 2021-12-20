import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {useFormContext, Controller} from 'react-hook-form';
import {Input, Text} from 'react-native-elements';

type BirthdayFormProps = {
  date: Date;
};

export const BirthdayForm = ({date}: BirthdayFormProps) => {
  const {
    control,
    setValue,
    formState: {errors},
  } = useFormContext();

  const [open, setOpen] = useState(false);
  const [formDate, setFormDate] = useState(date);

  useEffect(() => {
    setValue('birthdate', formDate);
  }, [formDate]);

  return (
    <View>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={() => (
          <Input
            disabled
            disabledInputStyle={{opacity: 1}}
            value={formDate.toLocaleDateString()}
            errorStyle={{color: 'red'}}
            errorMessage={errors?.birthdate?.message}
            onPressIn={() => setOpen(true)}
          />
        )}
        name="birthdate"
      />

      <DatePicker
        modal
        mode="date"
        open={open}
        date={formDate}
        onConfirm={date => {
          setOpen(false);
          setFormDate(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </View>
  );
};
