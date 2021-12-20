import React, {useEffect, useState} from 'react';
import {useFormContext} from 'react-hook-form';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Stash} from '../../../types/stash.type';

type AllowanceFormProps = {};

export const AllowanceForm = ({}: AllowanceFormProps) => {
  const {
    control,
    getValues,
    formState: {errors},
  } = useFormContext();

  const [allowance, setAllowance] = useState<Stash[]>();

  useEffect(() => {
    setAllowance(getValues('allowance'));
  }, []);

  return (
    <View style={style.allowance}>
      {allowance?.map(allow => (
        <View style={style.stash}>
          <Icon name="piggy-bank" size={20} style={style.icon} />

          <View style={{...style.detail, ...style.coins}}>
            <Text style={{paddingHorizontal: 2}}>{allow.amount}</Text>
            <Icon style={{paddingHorizontal: 2}} name="coins" size={10} />
          </View>
          <Text style={style.detail}>per</Text>
          <Text style={style.detail}>{allow.interval}</Text>
        </View>
      ))}
    </View>
  );
};

const style = StyleSheet.create({
  allowance: {
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  stash: {
    marginVertical: 3,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E6E5E5',
    borderRadius: 10,
  },
  icon: {flex: 4, textAlign: 'center'},
  coins: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  detail: {flex: 6, textAlign: 'center'},
  create: {},
});
