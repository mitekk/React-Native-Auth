import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button} from 'react-native-paper';
import {AvatarList} from '../../components/profile/list/avatar.list';
import {PROFILES} from '../../mock';
import {useAuth} from '../../utils/auth/auth';

export const HomeScreen = () => {
  const {signOut} = useAuth();
  return (
    <View style={styles.homeContainer}>
      <Button onPress={signOut}>signout</Button>
      <AvatarList profiles={PROFILES} />
    </View>
  );
};

const styles = StyleSheet.create({
  homeContainer: {flex: 1},
});
