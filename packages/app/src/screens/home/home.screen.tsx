import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {useQuery} from 'urql';
import {user_query} from '../../api/auth/user.gql';
import {useAuth} from '../../hooks/auth.hook';
import {useAppDispatch, useAppSelector} from '../../hooks/store.hook';
import {selectUser, setUser} from '../../state/user.slice';

export const HomeScreen = () => {
  const {accessToken, signOut} = useAuth();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  const [{data: userData}, executeUserQuery] = useQuery({
    query: user_query,
    pause: true,
  });

  useEffect(() => {
    if (accessToken) {
      executeUserQuery();
    }
  }, [accessToken]);

  useEffect(() => {
    if (userData) {
      const {__typename, ...user} = userData.user;
      dispatch(setUser(user));
    }
  }, [userData]);

  return (
    <View style={styles.homeContainer}>
      <Text>Home</Text>
      <Text>{user?.name}</Text>
      <Button onPress={signOut}>signout</Button>
      <Button onPress={executeUserQuery}>reload</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  homeContainer: {flex: 1},
});
