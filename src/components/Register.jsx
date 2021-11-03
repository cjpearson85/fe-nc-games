import { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { AppUserContext } from '../App'
import { getUserByUsername, postUser } from '../api'

const Register = () => {
  const { setLoggedInAs } = useContext(AppUserContext)
  const [usernameInput, setUsernameInput] = useState('')
  const [usernameValid, setUsernameValid] = useState()
  const [usernameAvailable, setUsernameAvailable] = useState(false)
  //   console.log(usernameValid, "<<< usernameValid");
  //   console.log(usernameAvailable, "<<< usernameAvailable");

  const [errorMsg, setErrorMsg] = useState('')

  const [nameInput, setNameInput] = useState('')
  const [avatarInput, setAvatarInput] = useState('')
  const history = useHistory()

  const checkUsername = () => {
    if (!/^[a-z0-9_]{5,20}$/.test(usernameInput)) {
      setErrorMsg(
        'username must be between 5-20 characters, containing only letters, numbers and underscores'
      )
      setUsernameValid(false)
    } else {
      setUsernameValid(true)
      getUserByUsername(usernameInput)
        .then(() => {
          setUsernameAvailable(false)
          setErrorMsg('username already taken')
        })
        .catch(() => {
          setUsernameAvailable(true)
        })
    }
  }

  const createAccount = (event) => {
    event.preventDefault()

    const newUser = {
      username: usernameInput,
      name: nameInput,
      avatar_url: avatarInput,
    }
    postUser(newUser).then((user) => {
      setLoggedInAs(user)
      history.push(`/users/${user.username}`)
    })
  }

  return (
    <div className="Register">
      <h2>Register account</h2>
      <form onSubmit={createAccount}>
        <label>
          Username:{' '}
          <input
            type="text"
            value={usernameInput}
            onChange={({ target: { value } }) => setUsernameInput(value)}
            onBlur={checkUsername}
            required
          />
          {usernameInput === ''
            ? null
            : usernameValid && usernameAvailable
            ? ' ✅'
            : ` ❌ ${errorMsg}`}
        </label>
        <br />
        <label>
          Name:{' '}
          <input
            type="text"
            value={nameInput}
            onChange={({ target: { value } }) => setNameInput(value)}
            required
          />
        </label>
        <br />
        <label>
          Avatar:{' '}
          <input
            type="url"
            value={avatarInput}
            onChange={({ target: { value } }) => setAvatarInput(value)}
          />
        </label>
        <button type="submit">Create account</button>
      </form>
    </div>
  )
}

export default Register
