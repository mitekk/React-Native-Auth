import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {useForm, FormProvider, SubmitHandler} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {Divider, FAB} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {ThemeForm} from '../components/profile/form/theme.form';
import {avatarUtil} from '../utils/form/avatar.util';
import {colorUtil} from '../utils/form/color.util';
import {DetailsForm} from '../components/profile/form/details.form';
import {Stash} from '../types/stash.type';
import {openImageGallery} from '../utils/gallery';
import {MediaForm} from '../components/profile/form/media.form';
import {allowanceUtil} from '../utils/form/allowance.util';

const schema = yup.object().shape({
  nickname: yup.string().required('required field'),
  allowance: yup.array().min(1),
});

type ProfileForm = {
  nickname: string;
  avatar: string;
  color: string;
  birthdate: Date;
  allowance: Stash[];
};

type preferredProfile = 'theme' | 'media';

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

  const [preferredProfile, setPreferredProfile] =
    useState<preferredProfile>('theme');
  const [mediaUri, setMediaUri] = useState<string>('');

  const onSubmit: SubmitHandler<ProfileForm> = data =>
    console.log('data submitted: ', data);

  const openMedia = async () => {
    const {assets} = await openImageGallery();
    if (assets) {
      const [{uri}] = assets;
      if (uri) {
        setMediaUri(uri);
        setPreferredProfile('media');
      }
    }
  };

  return (
    <View style={style.profileUpdate}>
      <FormProvider {...methods}>
        {
          {
            theme: (
              <Icon
                style={style.photo}
                name="camera"
                size={25}
                onPress={openMedia}
              />
            ),
            media: (
              <Icon
                style={style.photo}
                name="dice"
                size={25}
                onPress={() => setPreferredProfile('theme')}
              />
            ),
          }[preferredProfile]
        }
        {
          {
            theme: (
              <ThemeForm
                avatar={methods.getValues('avatar')}
                getAvatar={avatarUtil.getAvatar}
                color={methods.getValues('color')}
                getColor={colorUtil.getColor}
              />
            ),
            media: <MediaForm mediaUri={mediaUri} openMedia={openMedia} />,
          }[preferredProfile]
        }

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
    position: 'relative',
  },
  createButton: {
    backgroundColor: 'navy',
  },
  photo: {
    position: 'absolute',
    top: 25,
    right: 25,
    color: '#353534',
    zIndex: 1,
  },
});
