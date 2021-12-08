import { useEffect, useState, useContext } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import {
  deleteCommentById,
  getComments,
  getReviewById,
  postCommentToReview,
} from '../api'
import { AppUserContext } from '../App'
import { getTimeSince } from '../utils/helper-functions'
import LikeButton from './LikeButton'
import LoginPopup from './LoginPopup'
import Loader from './Loader'
import useToggle from '../hooks/useToggle'
import styles from '../css_modules/FullReview.module.css'
import postIcon from '../images/icons8-email-send-24.png'

const FullReview = () => {
  const {
    loggedInAs: { username },
  } = useContext(AppUserContext)

  const [review, setReview] = useState({})
  const [comments, setComments] = useState([])
  const [commentInput, setCommentInput] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [showLoginPrompt, toggleLoginPrompt] = useToggle()

  const { review_id } = useParams()
  const history = useHistory()

  useEffect(() => {
    setIsLoading(true)
    getReviewById(review_id)
      .then((review) => {
        setIsLoading(false)
        setReview(review)
      })
      .catch(() => {
        history.push('/')
      })
  }, [review_id, history])

  useEffect(() => {
    getComments(review_id).then((comments) => {
      setComments(comments)
    })
  }, [review_id])

  const handleSubmit = (event) => {
    event.preventDefault()
    if (username) {
      postCommentToReview(review_id, username, commentInput).then((comment) => {
        setCommentInput('')
        setComments((currentComments) => {
          return [comment, ...currentComments]
        })
      })
    } else {
      toggleLoginPrompt()
    }
  }

  const deleteComment = ({ target: { value } }) => {
    deleteCommentById(value).then(() => {
      setComments((currentComments) => {
        return currentComments.filter(({ comment_id }) => comment_id !== +value)
      })
    })
  }

  if (isLoading) return <Loader />
  return (
    <div className="FullReview">
      <img className={styles.image} src={review.review_img_url} alt="" />
      <div className={styles.review_container}>
        <h2 className={styles.title}>{review.title}</h2>
        <div
          className={styles.avatar_handle}
          onClick={() => history.push(`/users/${review.owner}`)}
        >
          <p className={styles.text}>
            <strong>{review.owner}</strong>
          </p>
          <img className={styles.avatar_img} src={review.avatar_url} alt="" />
        </div>
        <p className={styles.date}>posted {getTimeSince(review.created_at)}</p>
        <p className={styles.review_body}>{review.review_body}</p>
        <h4 className={styles.likes}>
          {review.votes} {review.votes === 1 ? 'like' : 'likes'}{' '}
          <LikeButton
            setReview={setReview}
            review_id={review_id}
            toggleLoginPrompt={toggleLoginPrompt}
            username={username}
          />
        </h4>
      </div>
      <h4 className={styles.comment_header}>Comments ({comments.length})</h4>
      <div className={styles.comment_container}>
        <form className={styles.comment_input} onSubmit={handleSubmit}>
          <input
            className={styles.text_field}
            required
            type="text"
            maxLength="140"
            placeholder="Add a comment"
            value={commentInput}
            onChange={({ target: { value } }) => setCommentInput(value)}
          />
          <button className={styles.send_button}>
            <img src={postIcon} alt="" />
          </button>
        </form>
        <ul className={styles.comments}>
          {comments.map(({ comment_id, author, body, votes, created_at }) => {
            return (
              <li key={comment_id} className={styles.comment_card}>
                <div className={styles.comment_rowOne}>
                  <h4
                    className={styles.avatar_handle}
                    onClick={() => history.push(`/users/${author}`)}
                  >
                    {author}
                  </h4>
                  {username === author && (
                    <button
                      className={styles.delete}
                      value={comment_id}
                      onClick={deleteComment}
                    >
                      ❌
                    </button>
                  )}
                </div>
                <p className={styles.date}>posted {getTimeSince(created_at)}</p>
                <h4 className={styles.comment_likes}>
                  {votes} {votes === 1 ? 'like' : 'likes'}{' '}
                  <LikeButton
                    setComments={setComments}
                    comment_id={comment_id}
                    toggleLoginPrompt={toggleLoginPrompt}
                    username={username}
                  />
                </h4>
                <p>{body}</p>
              </li>
            )
          })}
        </ul>
      </div>
      {showLoginPrompt && (
        <LoginPopup
          showLoginPrompt={showLoginPrompt}
          toggleLoginPrompt={toggleLoginPrompt}
        />
      )}
    </div>
  )
}

export default FullReview
