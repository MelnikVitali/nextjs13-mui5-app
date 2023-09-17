import * as yup from 'yup';

export const signInYupSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter a valid email address')
    .required('Please enter your email.'),
  password: yup
    .string()
    .required('Please enter your password.')
    .min(6, 'Password is too short!')
    .max(40, 'Password is too long!'),
  isTrustDevice: yup.boolean().default(false),
});

export const signUnYupSchema = yup.object().shape({
  name: yup
    .string()
    .required('Please enter your Full Name')
    .min(4, 'Full Name must be more than 4 characters!')
    .max(70),
  email: yup
    .string()
    .email('Please enter a valid email address')
    .required('Please enter your email'),
  password: yup
    .string()
    .required('Please enter your password.')
    .min(6, 'Password must be more than 6 characters!')
    .max(32, 'Password must be less than 32 characters!'),
  confirmPassword: yup
    .string()
    .required('Please re-type your password')
    // use oneOf to match one of the values inside the array.
    // use "ref" to get the value of password.
    .oneOf([yup.ref('password')], 'Passwords does not match'),
  isTrustDevice: yup.boolean().default(false),
});
export const resetPasswordSchema = yup.object().shape({
  password: yup
    .string()
    .required('Please enter your password.')
    .min(6, 'Password must be more than 6 characters!')
    .max(32, 'Password must be less than 32 characters!'),
  confirmPassword: yup
    .string()
    .required('Please re-type your password')
    .oneOf([yup.ref('password')], 'Passwords does not match'),
});

export const forgotPaSwordSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter a valid email address')
    .required('Please enter your email.'),
});
