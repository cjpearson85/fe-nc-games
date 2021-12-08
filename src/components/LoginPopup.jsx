import { useHistory } from 'react-router'
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material'

const LoginPopup = ({ showLoginPrompt, toggleLoginPrompt }) => {
  const history = useHistory()

  const handleClick = ({ target: { value } }) => {
    history.push(`/${value}`)
  }

  return (
    <Dialog
      open={showLoginPrompt}
      onClose={toggleLoginPrompt}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Please log in or register
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          This feature requires a valid account to use.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClick} value="register">
          Register
        </Button>
        <Button
          onClick={handleClick}
          value="login"
          variant="contained"
          autoFocus
        >
          Log In
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default LoginPopup
