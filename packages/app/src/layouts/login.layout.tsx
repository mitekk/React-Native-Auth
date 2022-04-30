import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, TouchableOpacity, View, ViewStyle} from 'react-native';
import {Avatar, useTheme} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {RegisterScreenNavigationProp} from '../screens/auth/login/login.screen';

type LayoutProps = {
  title?: JSX.Element;
  children?: JSX.Element;
  showBack?: boolean;
  showOption?: boolean;
  titleStyle?: ViewStyle;
  bodyStyle?: ViewStyle;
  optionClick?: () => void;
};

const defaultProps: LayoutProps = {
  showBack: true,
  showOption: false,
};

const LoginLayout = ({
  title,
  children,
  showBack,
  showOption,
  titleStyle,
  bodyStyle,
  optionClick,
}: LayoutProps) => {
  const {goBack} = useNavigation<RegisterScreenNavigationProp>();
  const {colors} = useTheme();

  return (
    <SafeAreaView
      edges={['top']}
      style={[
        styles.container,
        {backgroundColor: titleStyle?.backgroundColor || colors.mossGreen},
      ]}>
      <View style={[titleStyle, styles.topSection]}>
        {showBack && (
          <TouchableOpacity onPress={goBack} style={styles.navBack}>
            <Avatar.Icon
              size={45}
              icon="arrow-left"
              style={[{backgroundColor: colors.roseWhite}]}
            />
          </TouchableOpacity>
        )}
        {showOption && (
          <TouchableOpacity onPress={optionClick} style={styles.options}>
            <Avatar.Icon
              size={45}
              icon="camera-outline"
              style={[{backgroundColor: colors.roseWhite}]}
            />
          </TouchableOpacity>
        )}
        {title}
      </View>

      <View
        style={[
          styles.contentSection,
          {backgroundColor: colors.roseWhite},
          bodyStyle,
        ]}>
        {children}
      </View>
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
    top: 10,
    left: 10,
  },
  options: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  contentSection: {
    flex: 7,
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
    padding: 45,
  },
});

LoginLayout.defaultProps = defaultProps;

export {LoginLayout};
