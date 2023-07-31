import { logout } from '@/containers/Login/loginActions'

export const HEADER_FULL_PRODUCT_NAME = 'Online Computer Assembly'
export const tabLinks = [
  {
    name: 'Assembly',
    url: '/',
  },
  // {
  //   name: 'Builds',
  //   url: '/builds'
  // }
]

export const loginList = [
  {
    link: '/profile',
    name: 'Profile'
  },
  {
    name: 'Logout',
    onClick: () => logout()
  }
]

export const logoutList = [
  {
    link: '/login',
    name: 'Login'
  },
  {
    link: '/login?signUp=true',
    name: 'Sing in'
  }
]
