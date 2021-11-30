import { useState, useContext, useMemo, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { AppUserContext } from '../App'
import { getUserByUsername, postUser } from '../api'
import {
  TextField,
  Button,
  Tooltip,
  FormControlLabel,
  Checkbox,
} from '@mui/material'
import styles from '../css_modules/Register.module.css'

const Register = () => {
  const { setLoggedInAs } = useContext(AppUserContext)
  const [usernameAvailable, setUsernameAvailable] = useState()
  const [inputs, setInputs] = useState({
    username: '',
    name: '',
    password: '',
    confirm_password: '',
    avatar_url: '',
    checked: false,
  })
  const history = useHistory()

  const usernameValid = useMemo(
    () => /^[a-z0-9_]{5,20}$/.test(inputs.username),
    [inputs.username]
  )
  const nameValid = useMemo(
    () => /^[a-zA-Z '-]+$/.test(inputs.name),
    [inputs.name]
  )
  const passwordValid = useMemo(
    () =>
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*(\W|_))\S{8,20}$/.test(
        inputs.password
      ),
    [inputs.password]
  )
  const passwordConfirmValid = useMemo(
    () => inputs.confirm_password === inputs.password && passwordValid,
    [inputs.confirm_password, inputs.password, passwordValid]
  )
  const avatarValid = useMemo(
    () =>
      /(http)?s?:?(\/\/[^"']*\.(?:png|jpg|jpeg|gif|png|svg))/i.test(
        inputs.avatar_url
      ) || inputs.avatar_url === '',
    [inputs.avatar_url]
  )

  useEffect(() => {
    const checkUsername = setTimeout(() => {
      usernameValid &&
        getUserByUsername(inputs.username)
          .then(() => {
            setUsernameAvailable(false)
          })
          .catch(() => {
            setUsernameAvailable(true)
          })
    }, 2000)

    return () => clearTimeout(checkUsername)
  }, [inputs.username, usernameValid])

  const formValid = useMemo(() => {
    return [
      usernameAvailable,
      usernameValid,
      nameValid,
      passwordValid,
      passwordConfirmValid,
      avatarValid,
      inputs.checked,
    ].every((input) => input)
  }, [
    usernameAvailable,
    usernameValid,
    nameValid,
    passwordValid,
    passwordConfirmValid,
    avatarValid,
    inputs.checked,
  ])

  const handleChange = ({ target: { id, name, value, checked } }) => {
    if (id === 'checkbox') setInputs((values) => ({ ...values, checked }))
    if (name === 'username') setUsernameAvailable()
    setInputs((values) => ({ ...values, [name]: value }))
  }

  const handleSubmit = () => {
    const newUser = { ...inputs }
    delete newUser.confirm_password
    delete newUser.checked

    postUser(newUser)
      .then((user) => {
        setLoggedInAs(user)
        history.push('/')
      })
      .catch(() => {
        alert('Opps! Something went wrong!')
      })
  }

  return (
    <div className={styles.page}>
      <h2 className={styles.heading}>Register account</h2>
      <form className={styles.container}>
        <TextField
          fullWidth
          error={
            (!usernameValid || !usernameAvailable) && inputs.username !== ''
          }
          label="Username"
          variant="outlined"
          type="text"
          name="username"
          color={usernameValid && usernameAvailable ? 'success' : ''}
          helperText={
            inputs.username === ''
              ? ' '
              : !/^.{5,20}$/.test(inputs.username)
              ? 'Username must be between 5-20 characters.'
              : !usernameValid
              ? 'Lower case letters, numbers and underscores only.'
              : usernameAvailable === false
              ? 'Username already taken. Please choose another.'
              : usernameAvailable
              ? 'Username available'
              : ' '
          }
          value={inputs.username}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          error={!nameValid && inputs.name !== ''}
          label="Name"
          variant="outlined"
          type="text"
          name="name"
          color={nameValid ? 'success' : ''}
          helperText={
            !nameValid && inputs.name !== '' ? 'Please enter your name' : ' '
          }
          value={inputs.name}
          onChange={handleChange}
          required
          margin="dense"
        />
        <TextField
          fullWidth
          error={!passwordValid && inputs.password !== ''}
          label="Password"
          variant="outlined"
          type="password"
          name="password"
          color={passwordValid ? 'success' : ''}
          helperText={
            inputs.password === ''
              ? ' '
              : inputs.password.length <= 8
              ? 'Password must be 8 or more characters.'
              : !/[a-z]+/.test(inputs.password)
              ? 'Password must contain at least one lower case letter.'
              : !/[A-Z]+/.test(inputs.password)
              ? 'Password must contain at least one upper case letter.'
              : !/\d+/.test(inputs.password)
              ? 'Password must contain at least one number.'
              : !/(\W|_)+/.test(inputs.password)
              ? 'Password must contain at least one special character.'
              : /\s+/.test(inputs.password)
              ? 'Password must contain NO spaces.'
              : ' '
          }
          value={inputs.password}
          onChange={handleChange}
          required
          margin="dense"
        />
        <TextField
          fullWidth
          error={!passwordConfirmValid && inputs.confirm_password !== ''}
          label="Confirm Password"
          variant="outlined"
          type="password"
          name="confirm_password"
          color={passwordConfirmValid ? 'success' : ''}
          helperText={
            inputs.confirm_password === ''
              ? ' '
              : !passwordValid
              ? 'Enter a valid password first.'
              : !passwordConfirmValid
              ? 'Both password fields must match.'
              : ' '
          }
          value={inputs.confirm_password}
          onChange={handleChange}
          required
          margin="dense"
        />
        <TextField
          fullWidth
          error={!avatarValid}
          label="Avatar URL"
          variant="outlined"
          type="url"
          name="avatar_url"
          color={avatarValid ? 'success' : ''}
          helperText={
            !avatarValid ? 'Please enter a valid URL or leave blank.' : ' '
          }
          value={inputs.avatar_url}
          onChange={handleChange}
          margin="dense"
        />
        <FormControlLabel
          className={styles.checkbox}
          control={
            <Checkbox
              id="checkbox"
              color="primary"
              checked={inputs.checked}
              onChange={handleChange}
              required
            />
          }
          label="I agree to the terms & conditions"
        />
        <Tooltip
          title={!formValid ? 'Please fill out all the required fields.' : ''}
        >
          <span>
            <Button
              variant="contained"
              disabled={!formValid}
              onClick={handleSubmit}
            >
              Create account
            </Button>
          </span>
        </Tooltip>
      </form>
    </div>
  )
}

export default Register
