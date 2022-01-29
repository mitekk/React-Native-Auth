// import {DefaultTheme} from '@react-navigation/native';
import {
  DefaultTheme as PaperDefaultTheme,
  configureFonts,
} from 'react-native-paper';

const headerFontConfig = {
  header: {
    fontFamily: 'RobotoSlabRegular',
    fontWeight: '400' as '400',
  },
};

const mobileFontConfig = {
  ...headerFontConfig,
  regular: {
    fontFamily: 'RobotoRegular',
    fontWeight: '400' as '400',
  },
  medium: {
    fontFamily: 'RobotoMedium',
    fontWeight: '500' as '500',
  },
  light: {
    fontFamily: 'RobotoLight',
    fontWeight: '300' as '300',
  },
  thin: {
    fontFamily: 'RobotoThin',
    fontWeight: '100' as '100',
  },
};

const fontConfig = {
  ...headerFontConfig,
  web: {
    regular: {
      fontFamily:
        'RobotoRegular, "Helvetica Neue", Helvetica, Arial, sans-serif',
      fontWeight: '400' as '400',
    },
    medium: {
      fontFamily:
        'RobotoMedium, "Helvetica Neue", Helvetica, Arial, sans-serif',
      fontWeight: '500' as '500',
    },
    light: {
      fontFamily: 'RobotoLight, "Helvetica Neue", Helvetica, Arial, sans-serif',
      fontWeight: '300' as '300',
    },
    thin: {
      fontFamily: 'RobotoThin, "Helvetica Neue", Helvetica, Arial, sans-serif',
      fontWeight: '100' as '100',
    },
  },
  ios: mobileFontConfig,
  android: mobileFontConfig,
  default: {
    ...headerFontConfig,
    regular: {
      fontFamily: 'RobotoRegular',
      fontWeight: 'normal' as 'normal',
    },
    medium: {
      fontFamily: 'RobotoMedium',
      fontWeight: 'normal' as 'normal',
    },
    light: {
      fontFamily: 'RobotoLight',
      fontWeight: 'normal' as 'normal',
    },
    thin: {
      fontFamily: 'RobotoThin',
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
      nickel: string;
    }
    interface Theme {
      dark: boolean;
      // mode?: Mode;
      roundness: number;
      colors: ThemeColors;
      fonts: ThemeFonts;
      animation: ThemeAnimation;
    }
    interface ThemeFonts {
      header?: ThemeFont;
    }
  }
}
const bucketTheme = {
  ...PaperDefaultTheme,
  fonts: configureFonts(fontConfig),
  colors: {
    ...PaperDefaultTheme.colors,
    primary: '#312F23',
    accent: 'blue',
    background: '#FFFCFC',
    surface: 'red',
    backdrop: 'green',
    onSurface: 'yellow',
    text: '#312F23',
    placeHolder: '#D1D3D4',
    roseWhite: '#FFFCFC',
    mossGreen: '#A7D5B7',
    plantation: '#28534E',
    flamingo: '#EB5937',
    anzac: '#DABE45',
    rangitoto: '#312F23',
    nickel: '#727272',
  },
  roundness: 20,
};

export {bucketTheme};
