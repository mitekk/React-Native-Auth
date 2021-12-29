import React, {useState} from 'react';
import {useFormContext} from 'react-hook-form';
import {GestureResponderEvent, StyleSheet, TextInput, View} from 'react-native';
import {Avatar} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {openImageGallery} from '../../../utils/gallery';

type ThemeFormProps = {
  avatar: string;
  color: string;
  getAvatar: () => string;
  getColor: () => string;
};

export const ThemeForm = ({
  avatar,
  getAvatar,
  color,
  getColor,
}: ThemeFormProps) => {
  const {register, setValue} = useFormContext();

  const [formAvatar, setFormAvatar] = useState(avatar);
  const [formColor, setFormColor] = useState(color);

  const getAnotherAvatar = () => {
    const name = getAvatar();
    setValue('avatar', name);
    setFormAvatar(name);
  };

  const getAnotherColor = () => {
    const color = getColor();
    setValue('color', color);
    setFormColor(color);
  };
  const openMedia = async () => await openImageGallery();

  return (
    <View style={{...style.themeFormContainer, backgroundColor: formColor}}>
      <Icon style={style.photo} name="camera" size={25} onPress={openMedia} />
      <View style={style.colorField} onTouchStart={getAnotherColor}></View>
      <View style={style.profileInput}>
        <TextInput {...register('avatar')} style={style.hidden} />
        <TextInput {...register('color')} style={style.hidden} />
        <Avatar
          rounded
          size="xlarge"
          icon={{name: formAvatar, type: 'font-awesome-5'}}
          containerStyle={style.avatar}
          onPress={getAnotherAvatar}
        />
      </View>
      <View style={style.colorField} onTouchStart={getAnotherColor}></View>
    </View>
  );
};

const style = StyleSheet.create({
  themeFormContainer: {
    flex: 2,
    flexDirection: 'row',
  },
  profileInput: {
    flex: 1,
    justifyContent: 'space-evenly',
  },
  colorField: {flex: 1},
  hidden: {display: 'none'},
  avatar: {
    alignSelf: 'center',
  },
  photo: {
    position: 'absolute',
    top: 25,
    right: 25,
    color: '#353534',
    zIndex: 2,
  },
});
