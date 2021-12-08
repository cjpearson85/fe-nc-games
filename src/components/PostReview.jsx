import { useState, useMemo } from 'react'
import { useHistory } from 'react-router-dom'
import { postReview } from '../api'
import { prettifyText } from '../utils/helper-functions'
import {
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  MenuItem,
  FormControl,
} from '@mui/material'

const PostReview = ({
  categories,
  username,
  showReviewForm,
  toggleReviewForm,
}) => {
  const [inputs, setInputs] = useState({
    category: '',
    title: '',
    review_img_url: '',
    review_body: '',
  })

  console.log(inputs)

  // const [error, setError] = useState(false)
  const history = useHistory()

  const handleClose = () => {
    toggleReviewForm()
    setInputs({
      category: '',
      title: '',
      review_img_url: '',
      review_body: '',
    })
  }

  const handleChange = ({ target: { name, value } }) => {
    setInputs((values) => ({ ...values, [name]: value }))
  }

  const formValid = useMemo(() => {
    return [inputs.title, inputs.category, inputs.review_body].every(
      (input) => input !== ''
    )
  }, [inputs.title, inputs.category, inputs.review_body])

  const createReview = () => {
    if (inputs.review_img_url === '')
      inputs.review_img_url =
        'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg'

    const newReview = {
      ...inputs,
      owner: username,
      designer: 'Uncredited',
    }

    postReview(newReview)
      .then(({ review_id }) => {
        // setError(false)
        history.push(`/reviews/${review_id}`)
      })
      .catch(() => {
        // setError(true)
      })
  }

  return (
    <Dialog open={showReviewForm} onClose={handleClose} fullWidth>
      <DialogTitle>Submit a review</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Contribute to our ever-growing community today!
        </DialogContentText>
        <FormControl fullWidth margin="normal">
          <TextField
            select
            color="secondary"
            label="Category"
            name="category"
            value={inputs.category}
            onChange={handleChange}
            margin="dense"
            required
          >
            {categories.map(({ slug }) => {
              return (
                <MenuItem key={slug} value={slug}>
                  {prettifyText(slug)}
                </MenuItem>
              )
            })}
          </TextField>
          <TextField
            color="secondary"
            label="Title"
            variant="outlined"
            type="text"
            name="title"
            value={inputs.title}
            onChange={handleChange}
            required
            margin="dense"
          />
          <TextField
            color="secondary"
            label="Image URL"
            variant="outlined"
            type="text"
            name="review_img_url"
            value={inputs.review_img_url}
            onChange={handleChange}
            margin="dense"
          />
          <TextField
            multiline
            minRows={4}
            color="secondary"
            label="Body"
            variant="outlined"
            type="text"
            name="review_body"
            value={inputs.review_body}
            onChange={handleChange}
            margin="dense"
            required
          />
        </FormControl>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            disabled={!formValid}
            onClick={createReview}
            variant="contained"
          >
            Submit
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  )
}

export default PostReview
