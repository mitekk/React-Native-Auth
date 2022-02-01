import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {Avatar} from './avatar';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Profile} from '../../../types/profile/profile.type';
import {MainStackParams} from '../../../types/route.type';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

type ProfileScreenNavigationProp = NativeStackNavigationProp<
  MainStackParams,
  'Profile'
>;

type AvatarListProps = {
  profiles: Profile[];
};

export const AvatarList = ({profiles}: AvatarListProps) => {
  const {navigate} = useNavigation<ProfileScreenNavigationProp>();
  return (
    <View style={style.listContainer}>
      <FlatList
        keyExtractor={({name}, index) => `${name}-${index}`}
        data={profiles}
        horizontal
        contentContainerStyle={style.profileList}
        renderItem={({item}) => (
          <Avatar
            name={item.name}
            onPress={() =>
              navigate('Profile', {
                id: Math.floor(Math.random() * 100).toString(),
              })
            }
          />
        )}
      />
      <Icon
        name="user-plus"
        onPress={() => navigate('ProfileEdit')}
        size={30}
        style={style.addProfile}
      />
    </View>
  );
};

const style = StyleSheet.create({
  listContainer: {
    flexDirection: 'row',
  },
  addProfile: {
    paddingHorizontal: 20,
    alignSelf: 'center',
  },
  profileList: {
    borderWidth: 1,
    padding: 5,
    flex: 1,
  },
});
