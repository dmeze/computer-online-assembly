import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { isEmpty } from 'lodash'
import { useDispatch } from 'react-redux'

import Form from '@/components/Login/Form'
import {
  LOGIN_FIELDS,
  LOGIN_HEADER,
  LOGIN_INITIAL_VALUES,
  LOGIN_VALIDATION_SCHEMA,
  SIGNUP_FIELDS,
  SIGNUP_HEADER,
  SIGNUP_INITIAL_VALUES,
  SIGNUP_VALIDATION_SCHEMA
} from '@/containers/Login/constants'
import { loginUser, signUpUser } from '@/containers/Login/loginActions'

import styles from './Login.module.scss'

const Login = () => {
  const dispatch = useDispatch()
  const { query } = useRouter()
  const [isLogin, setIsLogin] = useState(true)

  useEffect(() => {
    if (!isEmpty(query)) {
      setIsLogin(query.signUp !== 'true')
    }
  }, [query])

  const handleOnSubmitLogin = async (values, { setSubmitting }) => {
    setSubmitting(true)
    await dispatch(loginUser(values))
  }

  const handleOnSubmitSignUp = async (values, { setSubmitting }) => {
    setSubmitting(true)
    await dispatch(signUpUser(values))
  }

  const getLoginFormFooter = (isSubmitting, isValid) => (
    <>
      <button
        type="submit"
        disabled={isSubmitting || !isValid}
        className={styles.submitBtn}
      >
        Log in
      </button>
      <button
        type="button"
        disabled={isSubmitting}
        className={styles.backBtn}
        onClick={() => setIsLogin(false)}
      >
        Sign up
      </button>
    </>
  )

  const getSignUpFormFooter = (isSubmitting, isValid) => (
    <>
      <button
        type="submit"
        disabled={isSubmitting || !isValid}
        className={styles.submitBtn}
      >
        Sign Up
      </button>
      <button
        type="button"
        disabled={isSubmitting}
        className={styles.backBtn}
        onClick={() => setIsLogin(true)}
      >
        Login
      </button>
    </>
  )

  return (
    <div className={styles.loginWrapper}>
      {isLogin
        ? <Form
          header={LOGIN_HEADER}
          fields={LOGIN_FIELDS}
          validationSchema={LOGIN_VALIDATION_SCHEMA}
          initialValues={LOGIN_INITIAL_VALUES}
          onSubmit={handleOnSubmitLogin}
          getFormFooter={getLoginFormFooter}
        />
        : <Form
          header={SIGNUP_HEADER}
          fields={SIGNUP_FIELDS}
          validationSchema={SIGNUP_VALIDATION_SCHEMA}
          initialValues={SIGNUP_INITIAL_VALUES}
          onSubmit={handleOnSubmitSignUp}
          getFormFooter={getSignUpFormFooter}
        />
      }
    </div>
  )
}

export default Login
