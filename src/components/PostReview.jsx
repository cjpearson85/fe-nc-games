import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { postReview } from '../api'
import { prettifyText } from '../utils/helper-functions'

const PostReview = ({ categories, username }) => {
  const [categoryInput, setCategoryInput] = useState('')
  const [titleInput, setTitleInput] = useState('')
  const [imageInput, setImageInput] = useState('')
  const [bodyInput, setBodyInput] = useState('')
  const [error, setError] = useState(false)
  const history = useHistory()

  const createReview = (event) => {
    event.preventDefault()

    let review_img_url
    imageInput === ''
      ? (review_img_url =
          'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg')
      : (review_img_url = imageInput)

    const newReview = {
      owner: username,
      title: titleInput,
      review_img_url,
      review_body: bodyInput,
      designer: 'Uncredited',
      category: categoryInput,
    }

    postReview(newReview)
      .then(({ review_id }) => {
        setError(false)
        history.push(`/reviews/${review_id}`)
      })
      .catch(() => {
        setError(true)
      })
  }

  return (
    <div className="review-form-container">
      <h3>Submit a review</h3>
      <form className="review-form" onSubmit={(event) => createReview(event)}>
        <label for="category-input">Category</label>
        <select
          id="category-input"
          className="input-field"
          required
          defaultValue=""
          onChange={({ target: { value } }) => setCategoryInput(value)}
        >
          <option disabled value="">
            Pick a category
          </option>
          {categories.map(({ slug }) => {
            return (
              <option key={slug} value={slug}>
                {prettifyText(slug)}
              </option>
            )
          })}
        </select>
        <br />
        <label for="title-input">Title</label>
        <input
          required
          id="title-input"
          className="input-field"
          type="text"
          maxLength="140"
          placeholder="Add a title"
          value={titleInput}
          onChange={({ target: { value } }) => setTitleInput(value)}
        />
        <br />
        <label for="image-input">Image URL</label>
        <input
          id="image-input"
          className="input-field"
          type="url"
          maxLength="140"
          placeholder="Add an image link"
          value={imageInput}
          onChange={({ target: { value } }) => setImageInput(value)}
        />
        <br />
        <label for="body-input">Review body</label>
        <textarea
          required
          className="input-field"
          id="body-input"
          cols="30"
          rows="10"
          maxLength="500"
          placeholder="Add review text"
          value={bodyInput}
          onChange={({ target: { value } }) => setBodyInput(value)}
        />
        <div className="submit-container">
          <button>Submit</button>
        </div>
      </form>
      {error && <p className="error">Oops! Something went wrong.</p>}
    </div>
  )
}

export default PostReview
