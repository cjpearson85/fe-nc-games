import { useState, useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { loginUser } from '../api'
import { AppUserContext } from '../App'
import { TextField, Button, Tooltip } from '@mui/material'
import styles from '../css_modules/Login.module.css'

const Login = () => {
  const { setLoggedInAs } = useContext(AppUserContext)
  const [inputs, setInputs] = useState({
    username: '',
    password: '',
  })
  const [userNotFound, setUserNotFound] = useState(false)
  const history = useHistory()
  console.log(inputs)

  const handleChange = ({ target: { name, value } }) => {
    if (userNotFound) setUserNotFound(false)
    setInputs((values) => ({ ...values, [name]: value }))
  }

  const handleSubmit = () => {
    localStorage.clear()
    loginUser(inputs)
      .then((user) => {
        setLoggedInAs(user)
        history.push('/')
      })
      .catch(() => {
        setUserNotFound(true)
      })
  }

  return (
    <div className={styles.page}>
      <h2 className={styles.heading}>Log In</h2>
      <form className={styles.container}>
        <TextField
          fullWidth
          color="secondary"
          error={userNotFound}
          label="Username"
          variant="outlined"
          type="text"
          name="username"
          value={inputs.username}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          color="secondary"
          error={userNotFound}
          label="Password"
          variant="outlined"
          type="password"
          name="password"
          helperText={userNotFound ? 'Username or password incorrect' : ' '}
          value={inputs.password}
          onChange={handleChange}
          required
          margin="normal"
        />
        <Tooltip
          title={
            inputs.username === '' || inputs.password === ''
              ? 'Please fill out all the required fields.'
              : ''
          }
        >
          <span>
            <Button
              variant="contained"
              disabled={
                inputs.username === '' || inputs.password === '' || userNotFound
              }
              onClick={handleSubmit}
            >
              Log in
            </Button>
          </span>
        </Tooltip>
        <p className={styles.link}>
          Don't have an account? Click here to{' '}
          <Link to="/register">register</Link>.
        </p>
      </form>
    </div>
  )
}

export default Login
