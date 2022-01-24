import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-elements';

export const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Hello</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'red'},
});
