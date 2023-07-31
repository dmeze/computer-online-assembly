import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { isEmptyArray } from 'formik'
import { filter, isArray, isEmpty, keys, omitBy, some } from 'lodash'

import Card from '@/components/CardContainer/Card'
import {
  createAccessories, deleteAccessory,
  editAccessory,
  getAccessories
} from '@/containers/Home/accessoriesActions'
import { selectAccessories } from '@/containers/Home/accessoriesSelectors'
import { selectConfigurations } from '@/containers/Builds/configurationsSelectors'
import {
  createConfiguration,
  deleteConfiguration,
  editConfiguration,
  getConfigurations
} from '@/containers/Builds/configurationsActions'
import {
  ACCESSORY_FIELDS,
  ACCESSORY_INITIAL_VALUES,
  ACCESSORY_VALIDATION_SCHEMA,
  ADD_ACCESSORY_BUTTON,
  ADD_CONFIGURATION_BUTTON,
  CONFIGURATION_FIELDS,
  CONFIGURATION_INITIAL_VALUES,
  CONFIGURATION_VALIDATION_SCHEMA,
  EDIT_ACCESSORY_BUTTON,
  EDIT_CONFIGURATION_BUTTON
} from '@/containers/Administration/constants'
import GoodsModal from '@/containers/Administration/GoodsModal'
import { Edit } from '@/components/Icons/Icons'
import Modal from '@/components/Modal'

import styles from './Goods.module.scss'

const Goods = ({ isAccessories }) => {
  const dispatch = useDispatch()
  const accessories = useSelector(selectAccessories) || []
  const configurations = useSelector(selectConfigurations) || []

  const [showModal, setShowModal] = useState(false)
  const [deleteId, setDeleteId] = useState('')
  const [editableGood, setEditableGood] = useState({})

  const goods = isAccessories ? accessories : configurations
  const addModalTitle = isAccessories ? ADD_ACCESSORY_BUTTON : ADD_CONFIGURATION_BUTTON
  const editModalTitle = isAccessories ? EDIT_ACCESSORY_BUTTON : EDIT_CONFIGURATION_BUTTON
  const initialValues = isAccessories ? ACCESSORY_INITIAL_VALUES : CONFIGURATION_INITIAL_VALUES
  const validationSchema = isAccessories
    ? ACCESSORY_VALIDATION_SCHEMA
    : CONFIGURATION_VALIDATION_SCHEMA
  const fields = isAccessories ? ACCESSORY_FIELDS : CONFIGURATION_FIELDS

  useEffect(() => {
    dispatch(getAccessories())
    dispatch(getConfigurations())
  }, [dispatch, isAccessories])

  const handleSubmitAccessoriesForm = (values) => {
    const filteredValues = omitBy(values, v => v === '' || v === 0 || isEmptyArray(v))
    const variables = filteredValues.supportedInterfaces
      ? {
        ...filteredValues,
        supportedInterfaces: isArray(filteredValues.supportedInterfaces)
          ? filteredValues.supportedInterfaces
          : filteredValues.supportedInterfaces.split(',')
      }
      : filteredValues

    dispatch(!isEmpty(editableGood) ? editAccessory(variables) : createAccessories(variables))
  }

  const handleSubmitConfigurationForm = (values) => {
    dispatch(!isEmpty(editableGood) ? editConfiguration(values) : createConfiguration(values))
  }

  const onSubmit = isAccessories ? handleSubmitAccessoriesForm : handleSubmitConfigurationForm

  const getFields = () => isEmpty(editableGood)
    ? fields
    : filter(fields, o => some(keys(omitBy(editableGood, v => v === null)), v => v === o.key))

  const handleDeleteAccessory = () => {
    dispatch(isAccessories ? deleteAccessory(deleteId) : deleteConfiguration(deleteId))
    setDeleteId('')
  }

  return (
    <div>
      {showModal && (
        <GoodsModal
          title={!isEmpty(editableGood) ? editModalTitle : addModalTitle}
          initialValues={!isEmpty(editableGood) ? editableGood : initialValues}
          validationSchema={validationSchema}
          fields={getFields()}
          accessories={accessories}
          onSubmit={onSubmit}
          onClose={() => {
            setShowModal(false)
            setEditableGood([])
          }}
        />
      )}
      {deleteId && (
        <Modal
          title={'Delete Accessory'}
          body="Are you sure, you want to delete accessory?"
          onClose={() => setDeleteId('')}
          onSubmit={handleDeleteAccessory}
        />
      )}
      <div className={styles.subHeader}>
        <button className={styles.addNewBtn} onClick={() => setShowModal(true)}>
          <FontAwesomeIcon icon={faPlus} />
          {addModalTitle}
        </button>
      </div>
      <div className={styles.administrationCardContainer}>
        {goods.map(({ _id, image, title, price, type, ...good }) => (
          <Card
            id={_id}
            key={_id}
            image={image}
            description={title}
            price={price}
            type={type}
            isAvailable={good.isAvailable || good.count}
            actionFooter={
              <div className={styles.actionFooter}>
                <button
                  className={styles.cartBtn}
                  disabled={!good.count}
                  onClick={() => setDeleteId(_id)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
                <button
                  className={styles.cartBtn}
                  onClick={() => {
                    setShowModal(true)
                    setEditableGood({ ...good, _id, image, title, price, type })
                  }}
                >
                  {<Edit />}
                </button>
              </div>
            }
          />
        ))}
      </div>
    </div>
  )
}

Goods.propTypes = {
  isAccessories: PropTypes.bool
}

export default Goods
