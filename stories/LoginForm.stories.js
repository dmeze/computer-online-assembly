import Form from '@/components/Login/Form'
import {
  LOGIN_FIELDS,
  LOGIN_INITIAL_VALUES,
  LOGIN_VALIDATION_SCHEMA
} from '@/containers/Login/constants'

import styles from '@/containers/Login/Login.module.scss'

export default {
  title: 'LoginForm',
  component: Form,
  tags: ['autodocs'],
  args: {
    header: 'Form Header',
    fields: LOGIN_FIELDS,
    validationSchema: LOGIN_VALIDATION_SCHEMA,
    initialValues: LOGIN_INITIAL_VALUES,
    onSubmit: () => {},
    getFormFooter: () => {}
  }
}

export const DefaultInput = {
  args: {
    header: 'Form Header',
    fields: LOGIN_FIELDS,
    validationSchema: LOGIN_VALIDATION_SCHEMA,
    initialValues: LOGIN_INITIAL_VALUES,
    onSubmit: () => {},
    getFormFooter: (isSubmitting, isValid) => <>
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
        onClick={() => {}}
      >
        Sign up
      </button>
    </>
  },
}
