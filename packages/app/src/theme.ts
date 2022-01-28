// import {DefaultTheme} from '@react-navigation/native';
import {
  DefaultTheme as PaperDefaultTheme,
  configureFonts,
} from 'react-native-paper';

const mobileFontConfig = {
  regular: {
    fontFamily: 'RobotoSlabRegular',
    fontWeight: '400' as '400',
  },
  medium: {
    fontFamily: 'RobotoSlabMedium',
    fontWeight: '500' as '500',
  },
  light: {
    fontFamily: 'RobotoSlabLight',
    fontWeight: '300' as '300',
  },
  thin: {
    fontFamily: 'RobotoSlabThin',
    fontWeight: '100' as '100',
  },
};

const fontConfig = {
  web: {
    regular: {
      fontFamily:
        'RobotoSlabRegular, "Helvetica Neue", Helvetica, Arial, sans-serif',
      fontWeight: '400' as '400',
    },
    medium: {
      fontFamily:
        'RobotoSlabMedium, "Helvetica Neue", Helvetica, Arial, sans-serif',
      fontWeight: '500' as '500',
    },
    light: {
      fontFamily:
        'RobotoSlabLight, "Helvetica Neue", Helvetica, Arial, sans-serif',
      fontWeight: '300' as '300',
    },
    thin: {
      fontFamily:
        'RobotoSlabThin, "Helvetica Neue", Helvetica, Arial, sans-serif',
      fontWeight: '100' as '100',
    },
  },
  ios: mobileFontConfig,
  android: mobileFontConfig,
  default: {
    regular: {
      fontFamily: 'sans-serif',
      fontWeight: 'normal' as 'normal',
    },
    medium: {
      fontFamily: 'sans-serif-medium',
      fontWeight: 'normal' as 'normal',
    },
    light: {
      fontFamily: 'sans-serif-light',
      fontWeight: 'normal' as 'normal',
    },
    thin: {
      fontFamily: 'sans-serif-thin',
      fontWeight: 'normal' as 'normal',
    },
  },
};

declare global {
  namespace ReactNativePaper {
    interface ThemeColors {
      roseWhite: string;
      mossGreen: string;
      plantation: string;
      flamingo: string;
      anzac: string;
      rangitoto: string;
    }
  }
}
const bucketTheme = {
  ...PaperDefaultTheme,
  fonts: configureFonts(fontConfig),
  colors: {
    ...PaperDefaultTheme.colors,
    roseWhite: '#FFFCFC',
    mossGreen: '#A7D5B7',
    plantation: '#28534E',
    flamingo: '#EB5937',
    anzac: '#DABE45',
    rangitoto: '#312F23',
  },
};

export {bucketTheme};
