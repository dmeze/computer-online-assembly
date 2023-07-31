import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { lazy, Suspense } from 'react'

import styles from './Builds.module.scss'

const CardContainer = lazy(() => import('@/components/CardContainer'))

const Builds = () => {
  return (
    <>
      <div className={styles.subHeader}>
        <div className={styles.searchField}>
          <FontAwesomeIcon icon={faSearch} color="#889099" />
          <input className={styles.searchInput}/>
        </div>
      </div>
      <div className={styles.container}>
        <Suspense fallback={<div>Loading...</div>}>
          <CardContainer />
        </Suspense>
      </div>
    </>
  )
}

export default Builds
