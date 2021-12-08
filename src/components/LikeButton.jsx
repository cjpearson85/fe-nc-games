import { patchReviewById, patchCommentById } from '../api'
import styles from '../css_modules/LikeButton.module.css'
import useToggle from '../hooks/useToggle'

const LikeButton = ({
  setReview,
  review_id,
  setComments,
  comment_id,
  toggleLoginPrompt,
  username,
}) => {
  const [liked, toggleLiked] = useToggle()

  const handleClick = ({ target: { name, value } }) => {
    toggleLiked()

    if (name === 'review') {
      setReview((curr) => {
        const updatedReview = { ...curr }
        updatedReview.votes = updatedReview.votes + +value
        return updatedReview
      })
      patchReviewById(review_id, +value).catch(() => {
        toggleLiked()
        setReview((curr) => {
          const updatedReview = { ...curr }
          updatedReview.votes = updatedReview.votes - +value
          return updatedReview
        })
      })
    } else {
      setComments((currentComments) => {
        return currentComments.map((comment) => {
          if (comment.comment_id === comment_id) {
            const updatedComment = { ...comment }
            updatedComment.votes = updatedComment.votes + +value
            return updatedComment
          } else {
            return comment
          }
        })
      })
      patchCommentById(comment_id, +value).catch(() => {
        toggleLiked()
        setComments((currentComments) => {
          return currentComments.map((comment) => {
            if (comment.comment_id === comment_id) {
              const updatedComment = { ...comment }
              updatedComment.votes = updatedComment.votes - +value
              return updatedComment
            } else {
              return comment
            }
          })
        })
      })
    }
  }

  return (
    <button
      className={`${styles.LikeButton} ${liked ? styles.unliked : ''}`}
      name={review_id ? 'review' : 'comment'}
      value={liked ? '-1' : '1'}
      onClick={username ? handleClick : toggleLoginPrompt}
    >
      ❤️
    </button>
  )

  // return (
  //   <button
  //     className={`${styles.LikeButton} ${liked ? styles.unliked : ''}`}
  //     value={liked ? '-1' : '1'}
  //     onClick={({ target: { value } }) => {
  //       setLiked((curr) => !curr)
  //       updateCommentLikes(value)
  //     }}
  //   >
  //     ❤️
  //   </button>
  // )
}

export default LikeButton
