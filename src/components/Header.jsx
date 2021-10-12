import styles from '../css_modules/Header.module.css'
import burger from '../images/icons8-menu-24.png'
import cancel from '../images/icons8-delete-24.png'
import search from '../images/icons8-search-24.png'

const Nav = ({ sidebarOpen, setSidebarOpen, searchOpen, setSearchOpen }) => {
  return (
    <header>
      <div
        className={`${styles.icon_container} ${
          sidebarOpen && styles.highlighted
        }`}
      >
        {sidebarOpen ? (
          <img
            src={cancel}
            alt="cancel_icon"
            className={styles.cancel_icon}
            onClick={() => setSidebarOpen((curr) => !curr)}
          />
        ) : (
          <img
            src={burger}
            alt="burger_icon"
            className={styles.burger_icon}
            onClick={() => setSidebarOpen((curr) => !curr)}
          />
        )}
      </div>
      <h1 className={styles.title}>^NC games</h1>
      <div
        className={`${styles.icon_container} ${
          searchOpen && styles.highlighted
        }`}
      >
        {searchOpen ? (
          <img
            src={cancel}
            alt="cancel_icon"
            className={styles.cancel_icon}
            onClick={() => setSearchOpen((curr) => !curr)}
          />
        ) : (
          <img
            src={search}
            alt="search_icon"
            className={styles.search_icon}
            onClick={() => setSearchOpen((curr) => !curr)}
          />
        )}
      </div>
    </header>
  )
}

export default Nav
