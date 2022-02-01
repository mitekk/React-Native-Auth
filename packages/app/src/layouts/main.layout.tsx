import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, TouchableOpacity, View, ViewStyle} from 'react-native';
import {Avatar, useTheme} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {RegisterScreenNavigationProp} from '../screens/auth/login/login.screen';

type LayoutProps = {
  header?: JSX.Element;
  children?: JSX.Element;
  showBack?: boolean;
  showOption?: boolean;
  headerStyle?: ViewStyle;
  bodyStyle?: ViewStyle;
  optionClick?: () => void;
};

const defaultProps: LayoutProps = {
  showBack: true,
  showOption: false,
};

const MainLayout = ({
  header,
  children,
  showBack,
  showOption,
  headerStyle,
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
        {backgroundColor: headerStyle?.backgroundColor || colors.mossGreen},
      ]}>
      <View style={[styles.topSection, headerStyle]}>
        {showBack && (
          <TouchableOpacity onPress={goBack}>
            <Avatar.Icon
              size={45}
              icon="arrow-left"
              style={[styles.navBack, {backgroundColor: colors.roseWhite}]}
            />
          </TouchableOpacity>
        )}
        {showOption && (
          <TouchableOpacity onPress={optionClick}>
            <Avatar.Icon
              size={45}
              icon="camera-outline"
              style={[styles.options, {backgroundColor: colors.roseWhite}]}
            />
          </TouchableOpacity>
        )}
        {header}
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
    top: 15,
    left: 15,
  },
  options: {
    position: 'absolute',
    top: 15,
    right: 15,
  },
  contentSection: {
    flex: 7,
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
    padding: 45,
  },
});

MainLayout.defaultProps = defaultProps;

export {MainLayout};
