import * as yup from 'yup';
import {passwordRegex} from './regex';

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email('Invalid email format')
    .required('Please enter an email'),
  password: yup
    .string()
    .required('Please enter your password')
    .matches(
      passwordRegex,
      'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character',
    ),
});
