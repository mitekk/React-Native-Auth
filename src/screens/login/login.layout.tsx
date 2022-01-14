import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Avatar, Text} from 'react-native-elements';
type LoginLayoutProps = {
  title: string;
  subtitle: string;
  uri?: string;
  children: JSX.Element;
};
export const LoginLayout = ({
  title,
  subtitle,
  uri,
  children,
}: LoginLayoutProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Avatar
          size={200}
          rounded
          source={{
            uri:
              uri ||
              'https://cdn.pixabay.com/photo/2019/11/03/20/11/portrait-4599553__340.jpg',
          }}></Avatar>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  header: {
    flex: 3,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    padding: 3,
  },
  subtitle: {
    fontSize: 15,
    padding: 3,
  },
});
