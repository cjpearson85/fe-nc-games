import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getComments,
  getReviewById,
  // patchCommentById,
  // patchReviewById,
  postCommentToReview,
} from "../api";
import { getTimeSince } from "../utils/helper-functions";
import LikeButton from "./LikeButton";

const FullReview = ({ loggedInAs: { username } }) => {
  const [review, setReview] = useState({});
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState("");
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { review_id } = useParams();

  useEffect(() => {
    setIsLoading(true);
    getReviewById(review_id).then((review) => {
      setIsLoading(false);
      setReview(review);
    });
  }, [review_id]);

  useEffect(() => {
    getComments(review_id).then((comments) => {
      setComments(comments);
    });
  }, [review_id]);

  const postComment = (event) => {
    event.preventDefault();
    postCommentToReview(review_id, username, commentInput).then((comment) => {
      setCommentInput("");
      setComments((currentComments) => {
        const updatedComments = [...currentComments];
        updatedComments.unshift(comment);
        return updatedComments;
      });
    });
  };

  // const updateReviewLikes = () => {
  //   setReview((curr) => {
  //     const updatedReview = { ...curr };
  //     updatedReview.votes++;
  //     return updatedReview;
  //   });
  //   patchReviewById(review_id, 1).catch(() => {
  //     setReview((curr) => {
  //       const updatedReview = { ...curr };
  //       updatedReview.votes--;
  //       return updatedReview;
  //     });
  //   });
  // };

  // const updateCommentLikes = (comment_id) => {
  //   setComments((currentComments) => {
  //     return currentComments.map((comment) => {
  //       if (comment.comment_id === comment_id) {
  //         const updatedComment = { ...comment };
  //         updatedComment.votes++;
  //         return updatedComment;
  //       } else {
  //         return comment;
  //       }
  //     });
  //   });
  //   patchCommentById(comment_id, 1).catch(() => {
  //     setComments((currentComments) => {
  //       return currentComments.map((comment) => {
  //         if (comment.comment_id === comment_id) {
  //           const updatedComment = { ...comment };
  //           updatedComment.votes--;
  //           return updatedComment;
  //         } else {
  //           return comment;
  //         }
  //       });
  //     });
  //   });
  // };

  const toggleComments = () => {
    setCommentsOpen((currStatus) => !currStatus);
  };

  if (isLoading) return <p className="loading">Loading...</p>;
  return (
    <div className="FullReview">
      <img src={review.review_img_url} alt="" />
      <div className="review_body">
        <h2>{review.title}</h2>
        <p>posted {getTimeSince(review.created_at)}</p>
        <p>by {review.owner}</p>
        <p>{review.review_body}</p>
        <h4>
          {review.votes} likes <LikeButton setReview={setReview} review_id={review_id} />
          {/* <button onClick={updateReviewLikes}>❤️</button> */}
        </h4>
        <h4>Comments ({comments.length})</h4>
        {review.comment_count === "0" ? null : (
          <button onClick={toggleComments}>
            {commentsOpen ? "Hide comments" : "Load comments"}
          </button>
        )}
        {commentsOpen ? (
          <>
            <ul className="comments">
              {comments.map(
                ({ comment_id, author, body, votes, created_at }) => {
                  return (
                    <li key={comment_id} className="comment-card">
                      <h4>{author}</h4>
                      <p>posted {getTimeSince(created_at)}</p>
                      <h5>
                        {votes} likes{" "}
                        <LikeButton setComments={setComments} comment_id={comment_id} />
                        {/* <button onClick={() => updateCommentLikes(comment_id)}>
                          ❤️
                        </button> */}
                      </h5>
                      <p>{body}</p>
                    </li>
                  );
                }
              )}
            </ul>
            <form onSubmit={(event) => postComment(event)}>
              <input
                type="text"
                required
                placeholder="Add a comment"
                onChange={({ target: { value } }) => setCommentInput(value)}
              />
              <button>Send</button>
            </form>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default FullReview;
