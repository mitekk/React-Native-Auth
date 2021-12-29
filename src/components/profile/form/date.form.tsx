import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {useFormContext, Controller} from 'react-hook-form';
import {Input} from 'react-native-elements';
import {FieldForm} from './field.form';

type DateFormProps = {
  name: string;
  label: string;
};

export const DateForm = ({name, label}: DateFormProps) => {
  const {
    control,
    setValue,
    getValues,
    formState: {errors},
  } = useFormContext();

  const [open, setOpen] = useState(false);
  const [formDate, setFormDate] = useState<Date>();

  useEffect(() => {
    setFormDate(getValues(name));
  }, []);

  useEffect(() => {
    setValue(name, formDate);
  }, [formDate]);

  return (
    <FieldForm lable={label}>
      <View>
        <Controller
          control={control}
          render={() => (
            <Input
              disabled
              disabledInputStyle={{opacity: 1}}
              value={formDate?.toLocaleDateString()}
              errorStyle={{color: 'red'}}
              errorMessage={errors?.birthdate?.message}
              onPressIn={() => {
                setOpen(true);
              }}
            />
          )}
          name={name}
        />

        {formDate && (
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
        )}
      </View>
    </FieldForm>
  );
};
