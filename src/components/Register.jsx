import { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { AppUserContext } from '../App'
import { postUser } from '../api'
import styles from '../css_modules/Register.module.css'

const Register = () => {
  const { setLoggedInAs } = useContext(AppUserContext)
  const [inputs, setInputs] = useState({})
  const history = useHistory()

  const handleChange = ({ target }) => {
    const { name, value } = target
    target.setCustomValidity(
      target.validity.patternMismatch ? target.title : ''
    )
    setInputs((values) => ({ ...values, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const newUser = { ...inputs }
    delete newUser.confirm_password

    postUser(newUser)
      .then((user) => {
        setLoggedInAs(user)
        history.push('/')
      })
      .catch((err) => {
        alert('Username already taken. Please choose another.')
        setInputs((values) => ({ ...values, username: '' }))
      })
  }

  return (
    <div className={styles.register}>
      <h2>Register account</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            name="username"
            title="Username must be between 5-20 characters; lower case letters, numbers and underscores only"
            value={inputs.username || ''}
            pattern="^[a-z0-9_]{5,20}$"
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Name:
          <input
            type="text"
            name="name"
            title="Please enter your name"
            value={inputs.name || ''}
            pattern="^[a-zA-Z '-]+$"
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            title="Password must be between 8-20 characters; must contain at least one upper case letter, one lower case letter, one number, one special character and NO spaces"
            value={inputs.password || ''}
            pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*(\W|_))\S{8,20}$"
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Confirm Password:
          <input
            type="password"
            name="confirm_password"
            title="Both password inputs must match"
            value={inputs.confirm_password || ''}
            pattern={`^${inputs.password}$`}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Avatar URL:
          <input
            type="url"
            name="avatar_url"
            title="Please enter a valid URL or leave blank"
            value={inputs.avatar_url || ''}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Create account</button>
      </form>
    </div>
  )
}

export default Register
