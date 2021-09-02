import { useState } from "react";
import {
    patchReviewById,
    patchCommentById
  } from "../api";

const LikeButton = ({setReview, review_id, setComments, comment_id}) => {
  const [liked, setLiked] = useState(false);

  const updateReviewLikes = () => {
    setReview((curr) => {
      const updatedReview = { ...curr };
      updatedReview.votes++;
      return updatedReview;
    });
    patchReviewById(review_id, 1).catch(() => {
      setReview((curr) => {
        const updatedReview = { ...curr };
        updatedReview.votes--;
        return updatedReview;
      });
    });
  };

  const updateCommentLikes = () => {
    setComments((currentComments) => {
      return currentComments.map((comment) => {
        if (comment.comment_id === comment_id) {
          const updatedComment = { ...comment };
          updatedComment.votes++;
          return updatedComment;
        } else {
          return comment;
        }
      });
    });
    patchCommentById(comment_id, 1).catch(() => {
      setComments((currentComments) => {
        return currentComments.map((comment) => {
          if (comment.comment_id === comment_id) {
            const updatedComment = { ...comment };
            updatedComment.votes--;
            return updatedComment;
          } else {
            return comment;
          }
        });
      });
    });
  };

  if (review_id) {

      return (
        <button
            className="LikeButton"
          onClick={() => {
            setLiked(true);
            updateReviewLikes();
          }}
          disabled={liked}
        >
          {liked ? "❤️" : "🤍"}
        </button>
      );
    } else if (comment_id) {
        return (
            <button
                className="LikeButton"
              onClick={() => {
                setLiked(true);
                updateCommentLikes();
              }}
              disabled={liked}
            >
              {liked ? "❤️" : "🤍"}
            </button>
          );
    }
  }

export default LikeButton;
