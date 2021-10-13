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
        <img
          src={sidebarOpen ? cancel : burger}
          alt={sidebarOpen ? 'cancel_icon' : 'burger_icon'}
          className={sidebarOpen ? styles.cancel_icon : styles.burger_icon}
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
        <img
          src={searchOpen ? cancel : search}
          alt={searchOpen ? 'cancel_icon' : 'search_icon'}
          className={searchOpen ? styles.cancel_icon : styles.search_icon}
          onClick={() => {
            setSearchOpen((curr) => !curr)
            !searchOpen && setSidebarOpen(false)
          }}
        />
      </div>
    </header>
  )
}

export default Nav
