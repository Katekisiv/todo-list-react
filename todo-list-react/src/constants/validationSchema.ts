import { object, string, date, ref } from 'yup'

import { parse, isDate } from 'date-fns'

function parseDateString(_: any, originalValue: any) {
  return isDate(originalValue)
    ? originalValue
    : parse(originalValue, 'yyyy-MM-dd', new Date())
}

export const registrationValidationSchema = object({
  firstName: string()
    .required('Name is required')
    .trim()
    .min(1, 'Must be at least 1 symbols')
    .max(12, 'Must be no more than 12 symbols'),
  lastName: string()
    .required('Name is required')
    .trim()
    .min(1, 'Must be at least 1 symbols')
    .max(12, 'Must be no more than 12 symbols'),
  email: string().trim().email('Invalid email').required('Email is required'),
  password: string()
    .trim()
    .min(8, 'Must be at least 8 symbols')
    .required('Password is required'),
  confirmPassword: string()
    .required('Confirm password is required')
    .when('password', (password, field) =>
      password
        ? field.required().oneOf([ref('password')], 'Passwords do not match')
        : field
    ),
  sex: string().oneOf(['male', 'female', 'others']),
  birthday: date()
    .transform(parseDateString)
    .min(new Date(Date.now() - 3905104000999), 'Invalid Date')
    .max(new Date(), 'Invalid Date'),
})

export const loginValidationSchema = object({
  email: string().trim().email('Invalid email').required('Email is required'),
  password: string()
    .trim()
    .min(8, 'Must be at least 8 symbols')
    .required('Password is required'),
})
