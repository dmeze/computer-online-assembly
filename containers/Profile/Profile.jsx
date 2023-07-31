import { lazy, Suspense, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { parseCookies } from 'nookies'
import { isArray, isEmpty } from 'lodash'
import { ErrorBoundary } from 'next/dist/client/components/error-boundary'

import ButtonGroup from '@/components/ButtonGroup'
import Card from '@/components/Profile/Card'
import {
  historyHeader,
  mapButtonsByRole,
  PROFILE_VALIDATION_SCHEMA,
  userRows
} from '@/containers/Profile/constants'
import { selectUser } from '@/containers/Profile/profileSelectors'
import { editUser } from '@/containers/Profile/profileActions'
import { getOrdersById } from '@/containers/Orders/ordersActions'
import { selectOrders } from '@/containers/Orders/ordersSelectors'

import styles from './Profile.module.scss'

const Administration = lazy(() => import('@/containers/Administration'))
const Table = lazy(() => import('@/components/Profile/Table'))

const Profile = () => {
  const dispatch = useDispatch()
  const { push } = useRouter()
  const [tab, setTab] = useState('user')
  const user = useSelector(selectUser)
  const orders = useSelector(selectOrders) || []
  const isDefaultRole = user?.role === 'default'

  useEffect(() => {
    if (!parseCookies()['USER_ID']) {
      push('/')
    }

    !isEmpty(user) && dispatch(getOrdersById())
  }, [user]) //eslint-disable-line

  useEffect(() => {
    !isEmpty(user) && tab === 'user' && dispatch(getOrdersById())
  }, [tab])

  const submitProfileForm = async (values, { setSubmitting }) => {
    setSubmitting(true)
    dispatch(editUser(values))
  }

  return (
    <>
      <div className={styles.header}>
        {user.firstName}&apos;s
        <p className={styles.title}>
      Profile
        </p>
        {!isDefaultRole && <ButtonGroup
          buttons={mapButtonsByRole[user?.role]}
          selected={tab}
          handleClick={(index) => setTab(index)}
        />}
      </div>
      {tab === 'user'
        ? (

          <div className={styles.dataContainer}>
            <Card
              rows={userRows}
              title="Credentials"
              initialValues={user}
              validationSchema={PROFILE_VALIDATION_SCHEMA}
              onSubmit={submitProfileForm}
            />
            <div className={styles.historyTableContainer}>
              <ErrorBoundary errorComponent={() => <div>Oops! Something went wrong.</div>}>
                <div>
                  {!isEmpty(orders) && isArray(orders)
                    ? <Table data={orders} header={historyHeader}/>
                    : <div>There are no orders now.</div>
                  }
                </div>
              </ErrorBoundary>
            </div>
          </div>

        )
        : <Suspense fallback={<div>Loading...</div>}>
          <Administration tab={tab} role={user?.role} />
        </Suspense>
      }
    </>
  )
}

export default Profile
