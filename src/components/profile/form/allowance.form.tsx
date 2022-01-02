import React, {useEffect, useState} from 'react';
import {useFormContext} from 'react-hook-form';
import {StyleSheet, View, FlatList, TouchableOpacity} from 'react-native';
import {Text} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {pullAt} from 'lodash';
import {Stash} from '../../../types/stash.type';
import {uuid} from '../../../utils/uuid';
import {FieldForm} from './field.form';
import {StashModal, StashResponse} from './stash.modal';

type AllowanceFormProps = {};

export const AllowanceForm = ({}: AllowanceFormProps) => {
  const {
    setValue,
    getValues,
    formState: {errors},
  } = useFormContext();

  const [allowance, setAllowance] = useState<Stash[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [stashToEdit, setStashToEdit] =
    useState<{stash: Stash; index: number}>();

  useEffect(() => {
    setAllowance(getValues('allowance'));
  }, []);

  useEffect(() => {
    allowance && setValue('allowance', allowance);
  }, [allowance]);

  const addStash = (
    <Icon
      name="plus"
      size={13}
      style={{
        alignSelf: 'flex-end',
        color: errors?.allowance?.message ? 'red' : 'black',
      }}
      onPress={() => setModalVisible(!modalVisible)}
    />
  );

  const renderItem = ({item, index}: {item: Stash; index: number}) => (
    <TouchableOpacity
      onPress={() => {
        setStashToEdit({stash: item, index});
        setModalVisible(!modalVisible);
      }}>
      <View style={style.stash}>
        <Icon name="piggy-bank" size={20} style={style.icon} />
        <View style={{...style.detail, ...style.coins}}>
          <Text style={{paddingHorizontal: 2}}>{item.amount}</Text>
          <Icon style={{paddingHorizontal: 2}} name="coins" size={10} />
        </View>
        <Text style={style.detail}>per</Text>
        <Text style={style.detail}>{item.interval}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <FieldForm
      lable="Allowance"
      action={addStash}
      style={{color: errors?.allowance?.message ? 'red' : 'black'}}>
      <View style={style.allowance}>
        <FlatList
          data={allowance}
          renderItem={renderItem}
          keyExtractor={() => uuid()}
        />
        <StashModal
          visible={modalVisible}
          stash={stashToEdit}
          color={getValues('color')}
          hide={response => {
            const handleResponse = ({stash, index}: StashResponse) => ({
              create: () => {
                setAllowance([...allowance, stash!]);
              },
              update: () =>
                setAllowance(
                  allowance.map((existingStash, stashIndex) => {
                    if (stashIndex === index) {
                      return stash!;
                    }
                    return existingStash;
                  }),
                ),
              delete: () => {
                const allowanceCopy = [...allowance];
                pullAt(allowanceCopy, [index!]);
                setAllowance(allowanceCopy);
              },
              cancel: () => {},
            });

            const {action} = response;
            handleResponse(response)[action]();
            setModalVisible(false);
            setStashToEdit(undefined);
          }}
        />
      </View>
    </FieldForm>
  );
};

const style = StyleSheet.create({
  allowance: {
    height: 150,
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
