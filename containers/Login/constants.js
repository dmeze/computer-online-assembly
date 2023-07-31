import * as yup from 'yup'

export const LOGIN_HEADER = 'Log in to your account'

export const LOGIN_FIELDS = [
  {
    label: 'Email',
    type: 'email'
  },
  {
    label: 'Password',
    type: 'password'
  }
]

export const LOGIN_INITIAL_VALUES = { email: '', password: '' }

export const LOGIN_VALIDATION_SCHEMA = yup.object().shape({
  email: yup.string().email('Invalid email').required('Required'),
  password: yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
})

export const SIGNUP_HEADER = 'Create your account'

export const SIGNUP_FIELDS = [
  {
    label: 'First Name',
    type: 'firstName'
  },
  {
    label: 'Last Name',
    type: 'lastName'
  },
  {
    label: 'Address',
    type: 'address'
  },
  {
    label: 'Phone',
    type: 'phone'
  },
  {
    label: 'Email',
    type: 'email'
  },
  {
    label: 'Password',
    type: 'password'
  }
]

export const SIGNUP_INITIAL_VALUES = {
  firstName: '',
  lastName: '',
  address: '',
  phone: '',
  email: '',
  password: ''
}

const phoneRegExp = /(?=.*\+[0-9]{3}\s?[0-9]{2}\s?[0-9]{3}\s?[0-9]{4,5}$)/gm

export const SIGNUP_VALIDATION_SCHEMA = yup.object().shape({
  firstName: yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  lastName: yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  address: yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  phone: yup.string()
    .matches(phoneRegExp, 'Phone number is not valid')
    .min(10, 'Too Short!')
    .max(13, 'Too Long!')
    .required('Required'),
  email: yup.string().email('Invalid email').required('Required'),
  password: yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
})
