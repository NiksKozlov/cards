import * as yup from 'yup'

const name = yup.string().required('required')
const avatar = name
const email = yup.string().email('enter a valid email').required('email is required')
const password = yup
  .string()
  .min(8, 'password must contain at least 8 characters')
  .max(30, 'password must contain max 30 characters')
  .required('enter your password')
const confirmPassword = yup
  .string()
  .oneOf([yup.ref('password')], 'password does not match')
  .required('confirm your password')
const rememberMe = yup.boolean()

export const loginValidationSchema = yup.object({ email, password, rememberMe })

export const registrationValidationSchema = yup.object({ email, password, confirmPassword })

export const profileValidationSchema = yup.object({ name, avatar })

export const newPasswordValidationSchema = yup.object({ password })

export const forgotPasswordValidationSchema = yup.object({ email })
