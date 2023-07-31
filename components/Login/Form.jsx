import { ErrorMessage, Field, Formik, Form as FormikForm } from 'formik'
import PropTypes from 'prop-types'

import styles from './Form.module.scss'

const Form = ({ header, fields, validationSchema, initialValues, onSubmit, getFormFooter }) => {
  return (
    <div className={styles.formWrapper}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {({ isSubmitting, isValid, touched }) => (
          <FormikForm className={styles.form}>
            <span className={styles.formHeader}>{header}</span>
            {fields.map(({ label, type }) => (
              <div key={type} className={styles.fieldWrapper}>
                <span className={styles.fieldLabel}>{label}</span>
                <Field type={type} name={type} className={styles.field} />
                <ErrorMessage name={type} component="div" className={styles.errorMessage} />
              </div>
            ))}
            {getFormFooter(isSubmitting, isValid, touched)}
          </FormikForm>
        ) }
      </Formik>
    </div>
  )
}

Form.propTypes = {
  header: PropTypes.string,
  fields: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.string,
    label: PropTypes.string
  })),
  validationSchema: PropTypes.object,
  initialValues: PropTypes.object,
  onSubmit: PropTypes.func,
  getFormFooter: PropTypes.func
}

export default Form
