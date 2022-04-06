import * as yup from "yup";

export const resetPasswordSchema = yup.object().shape({
  email: yup
    .string()
    // .email('Invalid email format')
    .required("Please enter an email"),
  password: yup.string().required("Please enter your password"),
  // .matches(
  //   /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
  //   'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character',
  // ),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

export const validateEmailSchema = yup.object().shape({
  email: yup.string(),
  // .email('Invalid email format')
});
