import { useState } from "react";
import { patchReviewById, patchCommentById } from "../api";
import styles from '../css_modules/LikeButton.module.css'

const LikeButton = ({ setReview, review_id, setComments, comment_id }) => {
  const [liked, setLiked] = useState(false)

  const updateReviewLikes = (value) => {
    setReview((curr) => {
      const updatedReview = { ...curr }
      updatedReview.votes = updatedReview.votes + +value
      return updatedReview
    })
    patchReviewById(review_id, +value).catch(() => {
      setReview((curr) => {
        const updatedReview = { ...curr }
        updatedReview.votes = updatedReview.votes - +value
        return updatedReview
      })
    })
  }

  const updateCommentLikes = (value) => {
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

  if (review_id) {
    return (
      <button
        className={`${styles.LikeButton} ${liked ? styles.unliked : ''}`}
        value={liked ? '-1' : '1'}
        onClick={({ target: { value } }) => {
          setLiked((curr) => !curr)
          updateReviewLikes(value)
        }}
      >
        ❤️
      </button>
    )
  } else if (comment_id) {
    return (
      <button
        className={`${styles.LikeButton} ${liked ? styles.unliked : ''}`}
        value={liked ? '-1' : '1'}
        onClick={({ target: { value } }) => {
          setLiked((curr) => !curr)
          updateCommentLikes(value)
        }}
      >
        ❤️
      </button>
    )
  }
}

export default LikeButton;
