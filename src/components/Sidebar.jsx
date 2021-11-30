import { useHistory } from 'react-router-dom'
import { useContext } from 'react'
import { AppUserContext, SidebarStatusContext } from '../App'
import styles from '../css_modules/Sidebar.module.css'

const Sidebar = () => {
  const {
    loggedInAs: { username, name, avatar_url },
    setLoggedInAs,
  } = useContext(AppUserContext)
  const { sidebarOpen, setSidebarOpen } = useContext(SidebarStatusContext)
  const history = useHistory()

  return (
    <nav className={`${styles.Sidebar} ${sidebarOpen ? styles.show : ''}`}>
      {!name ? (
        <div>
          <img
            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
            alt=""
          />
          <h3>Guest</h3>
        </div>
      ) : (
        <div
          onClick={() => {
            setSidebarOpen(false)
            history.push(`/users/${username}`)
          }}
        >
          <img src={avatar_url} alt="" />
          <h3>{name}</h3>
        </div>
      )}
      <ul>
        <li
          onClick={() => {
            setSidebarOpen(false)
            history.push('/')
          }}
        >
          <p>Home</p>
        </li>
        <li
          onClick={() => {
            setSidebarOpen(false)
            history.push('/users')
          }}
        >
          <p>Users</p>
        </li>
        {!name ? (
          <li
            onClick={() => {
              setSidebarOpen(false)
              history.push('/login')
            }}
          >
            <p>Log In</p>
          </li>
        ) : (
          <li
            onClick={() => {
              setSidebarOpen(false)
              setLoggedInAs({})
              localStorage.clear()
              history.push('/')
            }}
          >
            <p>Log Out</p>
          </li>
        )}
        {/* <li>Dark mode</li> */}
      </ul>
    </nav>
  )
}

export default Sidebar
