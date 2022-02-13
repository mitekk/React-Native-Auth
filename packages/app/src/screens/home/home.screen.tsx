import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {useAuth} from '../../utils/auth/auth';

export const HomeScreen = () => {
  const {signOut} = useAuth();
  return (
    <View style={styles.homeContainer}>
      <Text>Home</Text>
      <Button onPress={signOut}>signout</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  homeContainer: {flex: 1},
});
