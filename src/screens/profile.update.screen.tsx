import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useForm, FormProvider, SubmitHandler} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {Divider, FAB} from 'react-native-elements';
import {ThemeForm} from '../components/profile/form/theme.form';
import {avatarUtil} from '../utils/form/avatar.util';
import {colorUtil} from '../utils/form/color.util';
import {DetailsForm} from '../components/profile/form/details.form';
import {allowanceUtil} from '../utils/form/allowance.util';
import {Stash} from '../types/stash.type';

const schema = yup.object().shape({
  nickname: yup.string().required('required field'),
});

type ProfileForm = {
  nickname: string;
  avatar: string;
  color: string;
  birthdate: Date;
  allowance: Stash[];
};

export const ProfileCreateScreen = () => {
  const initialAvatar = avatarUtil.getAvatar();
  const initialColor = colorUtil.getColor();
  const initialAllowance = allowanceUtil.getAllowance();

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      nickname: '',
      avatar: initialAvatar,
      color: initialColor,
      birthdate: new Date(),
      allowance: initialAllowance,
    },
  });

  const onSubmit: SubmitHandler<ProfileForm> = data =>
    console.log('data submitted: ', data);

  return (
    <View style={style.profileUpdate}>
      <FormProvider {...methods}>
        <ThemeForm
          avatar={initialAvatar}
          getAvatar={avatarUtil.getAvatar}
          color={initialColor}
          getColor={colorUtil.getColor}
        />
        <Divider orientation="horizontal" />
        <DetailsForm />
      </FormProvider>
      <FAB
        title="Create"
        buttonStyle={style.createButton}
        onPress={methods.handleSubmit(onSubmit)}></FAB>
    </View>
  );
};

const style = StyleSheet.create({
  profileUpdate: {
    flexDirection: 'column',
    height: '95%',
  },
  createButton: {
    backgroundColor: 'navy',
  },
});
