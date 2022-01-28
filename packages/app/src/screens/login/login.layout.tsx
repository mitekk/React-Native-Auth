import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Avatar} from 'react-native-paper';
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
        <Avatar.Image
          size={200}
          source={{
            uri:
              uri ||
              'https://cdn.pixabay.com/photo/2019/11/03/20/11/portrait-4599553__340.jpg',
          }}
        />
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
