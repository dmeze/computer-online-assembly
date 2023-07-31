import * as yup from 'yup'
import { capitalize } from 'lodash'

export const userRows = [
  {
    label: 'Name',
    key: 'firstName'
  },
  {
    label: 'Last name',
    key: 'lastName'
  },
  {
    label: 'Address',
    key: 'address'
  },
  {
    label: 'Email',
    key: 'email'
  },
  {
    label: 'Phone',
    key: 'phone'
  }
]

const phoneRegExp = /(?=.*\+[0-9]{3}\s?[0-9]{2}\s?[0-9]{3}\s?[0-9]{4,5}$)/gm

export const PROFILE_VALIDATION_SCHEMA = yup.object().shape({
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
  email: yup.string().email('Invalid email').required('Required')
})

export const historyHeader = [
  {
    Header: 'Title',
    accessor: 'configuration.title',
  },
  {
    Header: 'Date',
    accessor: ({ date }) => new Date(Number(date)).toLocaleString()
  },
  {
    Header: 'Price',
    accessor: ({ price }) => `${price} ₴`,
  },
  {
    Header: 'Accessories',
    id: 'accessoriesList',
    accessor: ({ configuration }) => (
      configuration.accessoriesList?.map(({ title }) => title).join(', ')
    ),
  },
  {
    Header: 'Status',
    accessor: ({ state }) => state === 'inProgress' ? 'In Progress' : capitalize(state)
  }
]

export const ADMIN_BUTTONS = [
  {
    title: 'User',
    index: 'user'
  },
  {
    title: 'Accessories',
    index: 'accessories'
  },
  {
    title: 'Configurations',
    index: 'configurations'
  },
  {
    title: 'Orders',
    index: 'orders'
  }
]

export const MASTER_BUTTONS = [
  {
    title: 'User',
    index: 'user'
  },
  {
    title: 'Orders for Build',
    index: 'orders',
    role: 'master'
  }
]

export const QA_BUTTONS = [
  {
    title: 'User',
    index: 'user'
  },
  {
    title: 'Orders in QA',
    index: 'orders',
    role: 'qa'
  }
]

export const mapButtonsByRole = {
  qa: QA_BUTTONS,
  admin: ADMIN_BUTTONS,
  master: MASTER_BUTTONS
}
