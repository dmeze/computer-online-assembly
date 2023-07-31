import { Suspense, lazy } from 'react'
import PropTypes from 'prop-types'
import { ErrorBoundary } from 'next/dist/client/components/error-boundary'

const Goods = lazy(() => import('./Goods'))
const Orders = lazy(() => import('./Orders'))

const Administration = ({ tab, role }) => {

  return (
    <div>
      <ErrorBoundary errorComponent={() => <div>Oops! Something went wrong.</div>}>
        {tab === 'accessories' || tab === 'configurations'
          ? <Suspense fallback={<div>Loading...</div>}>
            <Goods isAccessories={tab === 'accessories'} />
          </Suspense>
          : <Suspense fallback={<div>Loading...</div>}>
            <Orders role={role} />
          </Suspense>
        }
      </ErrorBoundary>
    </div>
  )
}

Administration.propTypes = {
  tab: PropTypes.string,
  role: PropTypes.string
}

export default Administration
