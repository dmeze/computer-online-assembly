import { ErrorMessage, Field, Form, Formik } from 'formik'
import { useRef, useState } from 'react'
import Select from 'react-select'
import PropTypes from 'prop-types'

import Modal from '@/components/Modal'

import styles from '@/containers/Administration/Goods.module.scss'

const SelectField = ({ options, field, form, ...props }) => {
  const [selectedOption, setSelectedOption] = useState(form.values.accessoriesList.map(({
    _id, title
  }) => ({ label: title, value: _id })))
  const onChange = (option) => {
    form.setFieldValue(field.name, option.map(({ value }) => value))
    setSelectedOption(option)
  }

  return <Select
    {...props}
    options={options}
    name={field.name}
    value={selectedOption}
    onChange={onChange}
    isMulti
    onBlur={field.onBlur}
  />
}

SelectField.propTypes = {
  options: PropTypes.array,
  field: PropTypes.object,
  form: PropTypes.object
}

const GoodsModal = ({
  title,
  initialValues,
  validationSchema,
  onSubmit,
  fields,
  accessories,
  onClose
}) => {
  const formRef = useRef()

  return (
    <Modal
      title={title}
      body={
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          enableReinitialize
          innerRef={formRef}
        >
          {() => (
            <Form className={styles.form}>
              {fields.map(({ label, type, key, as }) => (
                <div key={key} className={styles.fieldWrapper}>
                  <span className={styles.fieldLabel}>{label}</span>
                  {as
                    ? <Field
                      component={SelectField}
                      name={key}
                      className={styles.selectField}
                      options={accessories.map(({ _id, title }) => (
                        { value: _id, label: title })
                      )}
                    />
                    : <Field type={type} name={key} className={styles.field} />
                  }
                  <ErrorMessage name={key} component="div" className={styles.errorMessage} />
                </div>
              ))}
            </Form>
          ) }
        </Formik>
      }
      onSubmit={() => {
        if (formRef.current) {
          formRef.current.handleSubmit()
        }

        onClose()
      }}
      onClose={() => onClose()}
    />
  )
}

GoodsModal.propTypes = {
  title: PropTypes.string,
  initialValues: PropTypes.object,
  validationSchema: PropTypes.object,
  onSubmit: PropTypes.func,
  fields: PropTypes.array,
  accessories: PropTypes.array,
  onClose: PropTypes.func
}

export default GoodsModal
