import * as yup from 'yup'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import Select from 'react-select'
import { capitalize } from 'lodash'

export const ADD_ACCESSORY_BUTTON = 'Add new Accessory'
export const ADD_CONFIGURATION_BUTTON = 'Add new Configuration'

export const EDIT_ACCESSORY_BUTTON = 'Edit your accessory'
export const EDIT_CONFIGURATION_BUTTON = 'Edit your Configuration'

export const ACCESSORY_INITIAL_VALUES = {
  title: '',
  manufacturer: '',
  quality: '',
  type: '',
  model: '',
  price: 0,
  count: 0,
  image: '',
  supportedInterfaces: [],
  interface: '',
  size: '',
  power: '',
  speed: '',
  cores: 0,
  memory: '',
}

export const CONFIGURATION_INITIAL_VALUES = {
  title: '',
  description: '',
  image: '',
  accessoriesList: []
}

export const ACCESSORY_VALIDATION_SCHEMA = yup.object().shape({
  title: yup.string().required('Required'),
  manufacturer: yup.string().required('Required'),
  quality: yup.string().required('Required'),
  type: yup.string().required('Required'),
  model: yup.string().required('Required'),
  price: yup.number().required('Required'),
  count: yup.number().required('Required'),
  image: yup.string().required('Required'),
})

export const CONFIGURATION_VALIDATION_SCHEMA = yup.object().shape({
  title: yup.string().required('Required'),
  description: yup.string().required('Required'),
  image: yup.string().required('Required'),
})

export const ORDER_VALIDATION_SCHEMA = yup.object().shape({
  title: yup.string().required('Required'),
  description: yup.string().required('Required'),
  image: yup.string().required('Required'),
})

export const ACCESSORY_FIELDS = [
  {
    label: 'Title',
    key: 'title'
  },
  {
    label: 'Manufacturer',
    key: 'manufacturer'
  },
  {
    label: 'Quality',
    key: 'quality'
  },
  {
    label: 'Type',
    key: 'type'
  },
  {
    label: 'Model',
    key: 'model'
  },
  {
    label: 'Price',
    key: 'price',
    type: 'number'
  },
  {
    label: 'Count',
    key: 'count',
    type: 'number'
  },
  {
    label: 'Image',
    key: 'image'
  },
  {
    label: 'Supported Interfaces',
    key: 'supportedInterfaces'
  },
  {
    label: 'Interface',
    key: 'interface'
  },
  {
    label: 'Size',
    key: 'size'
  },
  {
    label: 'Power',
    key: 'power'
  },
  {
    label: 'Speed',
    key: 'speed'
  },
  {
    label: 'Cores',
    key: 'cores',
    type: 'number'
  },
  {
    label: 'Memory',
    key: 'memory'
  }
]

export const CONFIGURATION_FIELDS = [
  {
    label: 'Title',
    key: 'title'
  },
  {
    label: 'Description',
    key: 'description'
  },
  {
    label: 'Image',
    key: 'image'
  },
  {
    label: 'Accessories',
    key: 'accessoriesList',
    as: 'select'
  },
]

export const MASTER_SELECT_OPTIONS = [
  {
    value: 'inProgress',
    label: 'In Progress'
  },
  {
    value: 'testing',
    label: 'Testing'
  }
]

export const QA_SELECT_OPTIONS = [
  {
    value: 'testing',
    label: 'Testing'
  },
  {
    value: 'ready',
    label: 'Ready'
  }
]

export const ADMIN_SELECT_OPTIONS = [
  {
    value: 'inProgress',
    label: 'In Progress'
  },
  {
    value: 'testing',
    label: 'Testing'
  },
  {
    value: 'testing',
    label: 'Testing'
  },
  {
    value: 'ready',
    label: 'Ready'
  },
  {
    value: 'done',
    label: 'Done'
  }
]

export const getOrdersHeader = (styles, actions, role) => [
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
    accessor: 'state',
    Cell: ({ cell }) => {
      return (
        <Select
          className={styles.selectField}
          menuPortalTarget={document.body}
          menuPosition={'fixed'}
          defaultValue={{ value: cell?.row?.original?.state, label: capitalize(cell?.row?.original?.state) }}
          onChange={(state) => actions.onEdit(cell?.row?.original?._id, state)}
          options={role === 'admin'
            ? ADMIN_SELECT_OPTIONS
            : role === 'master' ? MASTER_SELECT_OPTIONS : QA_SELECT_OPTIONS}
        />
      )
    }
  },
  role === 'admin' && {
    Header: 'Actions',
    accessor: 'action',
    Cell: ({ cell }) => {
      return (
        <div className={styles.actionCellWrapper}>
          <FontAwesomeIcon
            icon={faTrash}
            onClick={() => actions.onDelete(cell?.row?.original?._id)}
          />
        </div>
      )
    }
  }
]
