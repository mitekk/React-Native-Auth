import {DefaultTheme} from '@react-navigation/native';
import merge from 'deepmerge';

const BucketTheme = {
  colors: {
    roseWhite: '#FFFCFC',
    mossGreen: '#A7D5B7',
    plantation: '#28534E',
    flamingo: '#EB5937',
    anzac: '#DABE45',
    rangitoto: '#312F23',
  },
};

export const Theme = merge(DefaultTheme, BucketTheme);
