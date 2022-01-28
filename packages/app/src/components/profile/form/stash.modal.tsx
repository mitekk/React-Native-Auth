import React, {useEffect, useState} from 'react';
import {Modal, StyleSheet, View} from 'react-native';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {Stash} from '../../../types/profile/stash.type';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import {FieldForm} from './field.form';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/FontAwesome5';
import DatePicker from 'react-native-date-picker';
import {Avatar, Button, TextInput} from 'react-native-paper';

const schema = yup.object().shape({
  interval: yup.string().required('required field'),
  amount: yup
    .number()
    .typeError('please specify amount')
    .positive('borrow from a kid?')
    .max(1000000, 'max value 1000000')
    .required('required field'),
  start: yup.date().required('required field'),
});

type StashModalProps = {
  visible: boolean;
  stash?: {stash: Stash; index: number};
  color: string;
  hide: (response: StashResponse) => void;
};

type StashAction = 'create' | 'update' | 'delete' | 'cancel';

export type StashResponse = {
  action: StashAction;
  stash?: Stash;
  index?: number;
};

export const StashModal = ({
  visible,
  stash: stashToEdit,
  color,
  hide,
}: StashModalProps) => {
  const {stash, index} = {...stashToEdit};
  const {interval, amount, start, balance} = {...stash};

  const [openIntervals, setOpenIntervals] = useState(false);
  const [intervals, setIntervals] = useState([
    {label: 'Day', value: 'day'},
    {label: 'Week', value: 'week'},
    {label: 'Month', value: 'month'},
  ]);
  const [openStart, setOpenStart] = useState(false);
  const [formDate, setFormDate] = useState<Date>();
  const [formInterval, setFormInterval] = useState<any>(interval || 'week');

  const {
    control,
    setValue,
    handleSubmit,
    formState: {errors},
  } = useForm<Stash>({
    resolver: yupResolver(schema),
    defaultValues: {
      interval: interval || 'week',
      amount: amount || 1,
      start: start || new Date(),
      balance: balance || 0,
    },
  });

  useEffect(() => {
    formInterval && setValue('interval', formInterval);
  }, [formInterval]);

  useEffect(() => {
    formDate && setValue('start', formDate);
  }, [formDate]);

  useEffect(() => {
    if (start && interval && amount && balance !== undefined) {
      setFormDate(start);
      setFormInterval(interval);
      setValue('amount', amount);
      setValue('balance', balance);
    } else {
      setFormDate(new Date());
      setFormInterval('week');
      setValue('amount', 1);
      setValue('balance', 0);
    }
  }, [start, interval, amount, balance]);

  const onSubmit: SubmitHandler<Stash> = data => {
    if (stashToEdit) {
      hide({index, action: 'update', stash: data});
    } else {
      hide({action: 'create', stash: data});
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        hide({action: 'cancel'});
      }}>
      <View style={style.centeredView}>
        <View style={style.modalView}>
          <Icon
            style={style.close}
            name={'times'}
            size={20}
            onPress={() => hide({action: 'cancel'})}
          />
          <Icon
            style={{...style.delete, display: stashToEdit ? 'flex' : 'none'}}
            name={'trash-alt'}
            size={18}
            onPress={() => hide({action: 'delete', index})}
          />

          <View style={style.header}>
            <Avatar.Icon
              size={125}
              icon="piggy-bank"
              style={{backgroundColor: color}}
            />
          </View>
          <View style={style.body}>
            <FieldForm lable="Intervals" containerStyle={{zIndex: 2}}>
              <Controller
                control={control}
                render={() => (
                  <DropDownPicker
                    open={openIntervals}
                    value={formInterval}
                    items={intervals}
                    setOpen={setOpenIntervals}
                    setValue={setFormInterval}
                    setItems={setIntervals}
                    style={{height: 40, marginTop: 5}}
                    containerStyle={{
                      backgroundColor: 'white',
                      elevation: 1000,
                    }}
                  />
                )}
                name="interval"
              />
            </FieldForm>
            <FieldForm lable="Amount">
              <Controller
                control={control}
                render={({field: {onChange, value, onBlur}}) => (
                  <TextInput
                    value={value.toString()}
                    onBlur={onBlur}
                    onChangeText={value => onChange(value)}
                    style={{zIndex: 1}}
                  />
                )}
                name="amount"
              />
            </FieldForm>
            <FieldForm lable={'Start from'}>
              <View>
                <Controller
                  control={control}
                  render={() => (
                    <TextInput
                      disabled
                      style={{opacity: 1}}
                      value={formDate?.toLocaleDateString()}
                      onPressIn={() => {
                        setOpenStart(true);
                      }}
                    />
                  )}
                  name="start"
                />

                {formDate && (
                  <DatePicker
                    modal
                    mode="date"
                    open={openStart}
                    date={formDate}
                    onConfirm={date => {
                      setOpenStart(false);
                      setFormDate(date);
                    }}
                    onCancel={() => {
                      setOpenStart(false);
                    }}
                  />
                )}
              </View>
            </FieldForm>
            <FieldForm lable="Initial balance">
              <Controller
                control={control}
                render={({field: {onChange, value, onBlur}}) => (
                  <TextInput
                    value={value.toString()}
                    onBlur={onBlur}
                    onChangeText={value => onChange(value)}
                    style={{zIndex: 1}}
                  />
                )}
                name="balance"
              />
            </FieldForm>
          </View>
          <Button style={style.createButton} onPress={handleSubmit(onSubmit)}>
            {stashToEdit ? 'Update' : 'Create'}
          </Button>
        </View>
      </View>
    </Modal>
  );
};

const style = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#5D5D5DB3',
  },
  modalView: {
    position: 'relative',
    height: '75%',
    width: '75%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  close: {
    position: 'absolute',
    top: 25,
    right: 25,
  },
  delete: {
    position: 'absolute',
    top: 25,
    left: 25,
    color: '#CB0F0FC9',
  },
  header: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },

  body: {
    flex: 10,
    justifyContent: 'space-evenly',
    paddingVertical: 20,
  },
  createButton: {
    backgroundColor: 'navy',
  },
});
