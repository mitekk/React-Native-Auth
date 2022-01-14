import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button} from 'react-native-elements';
import {RootScreenNavigation} from '../../types/route.type';
import {LoginLayout} from './login.layout';

export const IntoScreen = () => {
  const navigation = useNavigation<RootScreenNavigation>();
  return (
    <LoginLayout title="Bucket" subtitle="The easiest way to manage allowance">
      <View style={styles.body}>
        <Button
          title="Login"
          buttonStyle={{
            backgroundColor: 'rgba(39, 39, 39, 1)',
            borderRadius: 10,
          }}
          containerStyle={{
            width: '80%',
            marginVertical: 10,
          }}
          titleStyle={{color: 'white', marginHorizontal: 20}}
          onPress={() => navigation.navigate('Login')}
        />
        <Button
          title="Sign Up"
          buttonStyle={{
            backgroundColor: 'rgba(39, 39, 39, 1)',
            borderRadius: 10,
          }}
          containerStyle={{
            width: '80%',
            marginVertical: 10,
          }}
          titleStyle={{color: 'white', marginHorizontal: 20}}
          onPress={() => navigation.navigate('Register')}
        />
      </View>
    </LoginLayout>
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
  body: {flex: 3, alignItems: 'center', justifyContent: 'center'},
});
