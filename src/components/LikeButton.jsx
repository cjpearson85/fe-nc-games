import { useState } from "react";
import { patchReviewById, patchCommentById } from "../api";

const LikeButton = ({ setReview, review_id, setComments, comment_id }) => {
  const [liked, setLiked] = useState(false);

  const updateReviewLikes = (value) => {
    setReview((curr) => {
      const updatedReview = { ...curr };
      updatedReview.votes = updatedReview.votes + +value;
      return updatedReview;
    });
    patchReviewById(review_id, +value).catch(() => {
      setReview((curr) => {
        const updatedReview = { ...curr };
        updatedReview.votes = updatedReview.votes - +value;
        return updatedReview;
      });
    });
  };

  const updateCommentLikes = (value) => {
    setComments((currentComments) => {
      return currentComments.map((comment) => {
        if (comment.comment_id === comment_id) {
          const updatedComment = { ...comment };
          updatedComment.votes = updatedComment.votes + +value;
          return updatedComment;
        } else {
          return comment;
        }
      });
    });
    patchCommentById(comment_id, +value).catch(() => {
      setComments((currentComments) => {
        return currentComments.map((comment) => {
          if (comment.comment_id === comment_id) {
            const updatedComment = { ...comment };
            updatedComment.votes = updatedComment.votes - +value;
            return updatedComment;
          } else {
            return comment;
          }
        });
      });
    });
  };

  if (review_id) {
    {
      return liked ? (
        <button
          className="LikeButton"
          value="-1"
          onClick={({ target: { value } }) => {
            setLiked(false);
            updateReviewLikes(value);
          }}
        >
          ❤️
        </button>
      ) : (
        <button
          className="LikeButton"
          value="1"
          onClick={({ target: { value } }) => {
            setLiked(true);
            updateReviewLikes(value);
          }}
        >
          🤍
        </button>
      );
    }
  } else if (comment_id) {
    return liked ? (
      <button
        className="LikeButton"
        value="-1"
        onClick={({ target: { value } }) => {
          setLiked(false);
          updateCommentLikes(value);
        }}
      >
        ❤️
      </button>
    ) : (
      <button
        className="LikeButton"
        value="1"
        onClick={({ target: { value } }) => {
          setLiked(true);
          updateCommentLikes(value);
        }}
      >
        🤍
      </button>
    );
  }
};

export default LikeButton;
