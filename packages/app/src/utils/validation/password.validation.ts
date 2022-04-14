import * as yup from 'yup';

export const passwordSchema = yup.object().shape({
  email: yup
    .string()
    .email('Invalid email format')
    .required('Please enter an email'),
});
