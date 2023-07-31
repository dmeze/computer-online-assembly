import PropTypes from 'prop-types'
import { useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'
import { ErrorMessage, Field, Formik, Form as FormikForm } from 'formik'

import { Edit } from '@/components/Icons/Icons'

import styles from './Card.module.scss'

const Card = ({ rows, title, initialValues, validationSchema, onSubmit }) => {
  const formRef = useRef()
  const [editMode, setEditMode] = useState(false)

  return (
    <div className={styles.cardWrapper}>
      <div className={styles.cardTitle}>
        {title}
        {editMode
          ? (
            <div>
              <FontAwesomeIcon
                icon={faTimes}
                className={styles.icon}
                onClick={() => setEditMode(false)}
              />
              <FontAwesomeIcon
                icon={faCheck}
                className={styles.icon}
                onClick={() => {
                  if (formRef.current) {
                    formRef.current.handleSubmit()
                  }
                  setEditMode(false)
                }}
              />
            </div>
          )
          : <Edit onClick={() => setEditMode(true)} />
        }
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        enableReinitialize
        innerRef={formRef}
      >
        {() => (
          <FormikForm className={styles.form}>
            {rows?.map(({ label, key }) => (
              <div key={key} className={styles.fieldWrapper}>
                <span className={styles.fieldLabel}>{label}</span>
                {editMode
                  ? <Field type={key} name={key} className={styles.field} />
                  : <span>{initialValues[key]}</span>
                }
                <ErrorMessage name={key} component="div" className={styles.errorMessage} />
              </div>
            ))}
          </FormikForm>
        ) }
      </Formik>
    </div>
  )
}

Card.propTypes = {
  data: PropTypes.object,
  rows: PropTypes.array,
  title: PropTypes.string,
  initialValues: PropTypes.object,
  validationSchema: PropTypes.object,
  onSubmit: PropTypes.func
}

export default Card
