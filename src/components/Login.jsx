import { useState, useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { loginUser } from '../api'
import { AppUserContext } from '../App'

const Login = () => {
  const { setLoggedInAs } = useContext(AppUserContext)
  const [usernameInput, setUsernameInput] = useState('')
  const [passwordInput, setPasswordInput] = useState('')
  const [userNotFound, setUserNotFound] = useState(false)
  const history = useHistory()

  const attemptLogin = (event) => {
    event.preventDefault()
    localStorage.clear()
    loginUser({ username: usernameInput, password: passwordInput })
      .then((user) => {
        setLoggedInAs(user)
        history.push('/')
      })
      .catch(() => {
        setUserNotFound(true)
      })
  }

  return (
    <div className="Login">
      <h2>Log In</h2>
      <form onSubmit={attemptLogin}>
        <label>
          Username:{' '}
          <input
            type="text"
            required
            value={usernameInput}
            onChange={({ target: { value } }) => setUsernameInput(value)}
          />
        </label>
        <label>
          Password:{' '}
          <input
            type="password"
            required
            value={passwordInput}
            onChange={({ target: { value } }) => setPasswordInput(value)}
          />
        </label>
        <button type="submit">Submit</button>
        {userNotFound ? (
          <p className="error">Username or password incorrect</p>
        ) : null}
      </form>
      <p>
        Don't have an account? Click here to{' '}
        <Link to="/register">register</Link>.
      </p>
    </div>
  )
}

export default Login
