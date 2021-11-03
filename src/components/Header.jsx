import { useContext } from 'react'
import { SidebarStatusContext } from '../App'
import styles from '../css_modules/Header.module.css'
import burger from '../images/icons8-menu-24.png'
import cancel from '../images/icons8-delete-24.png'
// import search from '../images/icons8-search-24.png'

const Header = () => {
  const { sidebarOpen, setSidebarOpen, searchOpen, setSearchOpen } =
    useContext(SidebarStatusContext)

  return (
    <header className={styles.banner}>
      <div
        className={`${styles.icon_container} ${
          sidebarOpen && styles.highlighted
        }`}
      >
        <img
          src={sidebarOpen ? cancel : burger}
          alt={sidebarOpen ? 'cancel_icon' : 'burger_icon'}
          className={styles.icon}
          onClick={() => {
            setSidebarOpen((curr) => !curr)
            !sidebarOpen && setSearchOpen(false)
          }}
        />
      </div>
      <h1 className={styles.title}>^NC games</h1>
      <div
        className={`${styles.icon_container} ${
          searchOpen && styles.highlighted
        }`}
      >
        {/* <img
            src={searchOpen ? cancel : search}
            alt={searchOpen ? 'cancel_icon' : 'search_icon'}
            className={searchOpen ? styles.cancel_icon : styles.search_icon}
            onClick={() => {
              setSearchOpen((curr) => !curr)
              !searchOpen && setSidebarOpen(false)
            }}
          /> */}
      </div>
    </header>
  )
}

export default Header
