import Link from 'next/link'
import cx from 'classnames'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useSelector } from 'react-redux'

import { AppIcon, Profile } from '@/components/Icons/Icons'
import {
  HEADER_FULL_PRODUCT_NAME,
  loginList,
  logoutList,
  tabLinks
} from '@/components/Header/constants'
import { useOutsideClick } from '@/lib/hooks'
import { selectUser } from '@/containers/Profile/profileSelectors'

import styles from './Header.module.scss'

export const TabLink = ({
  link,
  router,
  id
}) => (
  <Link href={`${link.url}`}>
    <div
      className={cx(
        styles.tabGroup,
        styles[router.pathname === link.url ? 'tabGroup--selected' : '']
      )}
      data-testid="tab-link"
      key={id}>
      <span className="tab-group__link">{link.name}</span>
    </div>
  </Link>
)

TabLink.propTypes = {
  link: PropTypes.object,
  router: PropTypes.object,
  id: PropTypes.number,
}

export const DropDownMenu = ({ title, list, reload }) => {
  const [showDropDown, setShowDropdown] = useState(false)
  const ref = useOutsideClick(() => setShowDropdown(false))

  return (
    <div ref={ref}>
      <div
        className={styles.dropdownBtn}
        onClick={() => setShowDropdown(!showDropDown)}
      >
        {title}
      </div>
      {showDropDown && (
        <div className={styles.dropdownWrapper}>
          {list.map(({ link, name, onClick }) => (
            <Link
              key={name}
              href={link || ''}
              onClick={(e) => {
                onClick && e.preventDefault()

                setShowDropdown(false)
                onClick && onClick()
                onClick && reload()
              }}
            >
              <div>
                <span className="tab-group__link">{name}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

DropDownMenu.propTypes = {
  title: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  list: PropTypes.array,
  reload: PropTypes.func
}

const Header = () => {
  const router = useRouter()
  const { _id: userId } = useSelector(selectUser) || {}

  return (
    <header
      className={styles.header}
      data-testid="header-container"
    >
      <div className={styles.headerLogo} tabIndex="0">
        <AppIcon />
      </div>

      <div className="header__title" tabIndex="0">
        <h2>
          <Link href="/">
            <span className={'tab-group__link'}>
              {HEADER_FULL_PRODUCT_NAME.split(' ')[0]}
              <p className={styles.headerTitle}>
                {HEADER_FULL_PRODUCT_NAME.split(' ')[1] + ' ' + HEADER_FULL_PRODUCT_NAME.split(' ')[2]}
              </p>
            </span>
          </Link>
        </h2>
      </div>

      <nav className={styles.tabGroupContainer}>
        <ul className={styles.tabGroupContainer}>
          {tabLinks
            .map((link, index) => (
              <TabLink
                key={index}
                id={index}
                link={link}
                router={router}
              />
            ))
          }
        </ul>
      </nav>

      <div className={styles.headerControls}>
        <DropDownMenu
          title={<Profile />}
          list={userId ? loginList : logoutList}
          reload={router.reload}
        />
      </div>
    </header>
  )
}

export default Header
