import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Avatar} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';

export const HomeLayout = ({children}: {children: JSX.Element}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topSection}>
        <Avatar.Icon size={45} icon="arrow-left" style={styles.navBack} />
        <Avatar.Icon size={45} icon="camera-outline" style={styles.options} />
      </View>

      <View style={styles.contentSection}>{children}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topSection: {
    position: 'relative',
    flex: 3,
  },
  navBack: {
    position: 'absolute',
    top: 15,
    left: 15,
    backgroundColor: 'white',
  },
  options: {
    position: 'absolute',
    top: 15,
    right: 15,
    backgroundColor: 'white',
  },
  contentSection: {
    flex: 7,
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
    backgroundColor: 'red',
  },
  contentSectionLow: {
    flex: 5,
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
    backgroundColor: 'red',
  },
});
