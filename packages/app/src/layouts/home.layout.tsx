import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import {Text, useTheme} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';

type HomeProps = {
  children: JSX.Element;
  showVerify: boolean;
  bodyStyle?: ViewStyle;
};

const defaultProps: HomeProps = {
  children: <View></View>,
  showVerify: false,
};

const HomeLayout = ({children, bodyStyle}: HomeProps) => {
  const {colors} = useTheme();

  return (
    <SafeAreaView edges={['top']} style={[{backgroundColor: colors.roseWhite}]}>
      <View>
        <View style={styles.titleSection}>
          <Text>Pocket</Text>
        </View>
        <View
          style={[
            styles.contentSection,
            {backgroundColor: colors.roseWhite},
            bodyStyle,
          ]}>
          {children}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  titleSection: {
    display: 'flex',
    alignItems: 'center',
  },
  contentSection: {
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
    padding: 45,
    height: '100%',
  },
});

HomeLayout.defaultProps = defaultProps;

export {HomeLayout};
