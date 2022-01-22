import React, {useEffect, useMemo, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {useForm, FormProvider, SubmitHandler} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {Divider, FAB} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {ThemeForm} from '../../components/profile/form/theme.form';
import {DetailsForm} from '../../components/profile/form/details.form';
import {Stash} from '../../types/profile/stash.type';
import {MediaForm} from '../../components/profile/form/media.form';
import {allowanceUtil, colorUtil} from '../../utils/form';
import {openImageGallery} from '../../utils/imageGallery';
import {useProfileIcon} from '../../hooks/profileIcons.hook';

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
  const {randomAvatar, isLoading} = useProfileIcon();

  const initialColor = colorUtil.getColor();
  const initialAllowance = allowanceUtil.getAllowance();

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: useMemo(() => {
      return {
        nickname: '',
        avatar: randomAvatar(),
        color: initialColor,
        birthdate: new Date(),
        allowance: initialAllowance,
      };
    }, [isLoading]),
  });

  useEffect(() => {
    methods.reset({
      avatar: randomAvatar(),
    });
  }, [isLoading]);

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
                style={style.icon}
                name="camera"
                size={25}
                onPress={() => {
                  setPreferredProfile('media');
                  openMedia();
                }}
              />
            ),
            media: (
              <Icon
                style={style.icon}
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
                getAvatar={randomAvatar}
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
  icon: {
    position: 'absolute',
    top: 25,
    right: 25,
    color: '#353534',
    zIndex: 1,
  },
});
