import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Avatar} from './avatar';
import {RootScreenNavigation} from '../../../types/route.type';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Profile} from '../../../types/profile/profile.type';

type AvatarListProps = {
  profiles: Profile[];
};

export const AvatarList = ({profiles}: AvatarListProps) => {
  const navigation = useNavigation<RootScreenNavigation>();
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
              navigation.navigate('Profile', {
                id: Math.floor(Math.random() * 100),
              })
            }
          />
        )}
      />
      <Icon
        name="user-plus"
        onPress={() => navigation.navigate('ProfileCreate')}
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
