import { useHistory } from 'react-router-dom'

const Sidebar = ({
  loggedInAs: { username, name, avatar_url },
  setLoggedInAs,
  sidebarOpen,
  setSidebarOpen,
}) => {
  const history = useHistory()

  return (
    <nav className={`Sidebar ${sidebarOpen && 'showSidebar'}`}>
      {!name ? (
        <>
          <img
            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
            alt=""
          />
          <h3>Guest</h3>
        </>
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
