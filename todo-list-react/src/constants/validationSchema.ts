import { object, string, date, ref } from 'yup'

export const validationSchema = object().shape({
  name: string()
    .trim()
    .min(1, 'Must be at least 1 symbols')
    .max(12, 'Must be no more than 12 symbols')
    .required('Name is required'),
  email: string().trim().email('Invalid email').required('Email is required'),
  password: string()
    .trim()
    .min(8, 'Must be at least 8 symbols')
    .required('Password is required'),
  confirmPassword: string().when('password', (password, field) =>
    password ? field.required().oneOf([ref('password')]) : field
  ),
  birthday: date()
    .min(new Date(Date.now() - 3905104000999), 'Invalid Date')
    .max(new Date(), 'Invalid Date'),
})
