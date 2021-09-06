import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import {
  deleteCommentById,
  getComments,
  getReviewById,
  postCommentToReview,
} from "../api";
import { getTimeSince } from "../utils/helper-functions";
import LikeButton from "./LikeButton";
import Loader from "./Loader";

const FullReview = ({ loggedInAs: { username } }) => {
  const [review, setReview] = useState({});
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState("");
  const [commentsOpen, setCommentsOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const { review_id } = useParams();
  const history = useHistory()

  useEffect(() => {
    setIsLoading(true);
    getReviewById(review_id).then((review) => {
      setIsLoading(false);
      setReview(review);
    }).catch(() => {
      history.push("/");
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
        return [comment, ...currentComments]
      });
    });
  };

  const deleteComment = ({target: {value}}) => {
    deleteCommentById(value).then(() => {
      setComments(currentComments => {
        return currentComments.filter(({comment_id}) => comment_id != value)
      })
    })
  }

  const toggleComments = () => {
    setCommentsOpen((currStatus) => !currStatus);
  };

  if (isLoading) return <Loader/>;
  return (
    <div className="FullReview">
      <img src={review.review_img_url} alt="" />
      <div className="review_body">
        <h2>{review.title}</h2>
        <p>posted {getTimeSince(review.created_at)}</p>
        <p>by {review.owner}<img className="small__avatar" src={review.avatar_url} alt="" /></p>
        <p>{review.review_body}</p>
        <h4>
          {review.votes} likes <LikeButton setReview={setReview} review_id={review_id} />
        </h4>
        <h4>Comments ({comments.length})</h4>
        {review.comment_count === "0" ? null : (
          <button onClick={toggleComments}>
            {commentsOpen ? "Hide comments" : "Load comments"}
          </button>
        )}
        {username && (<form onSubmit={(event) => postComment(event)}>
              <input
                required
                type="text"
                maxLength="140"
                placeholder="Add a comment"
                value={commentInput}
                onChange={({ target: { value } }) => setCommentInput(value)}
              />
              <button>Send</button><span>  {commentInput.length ? commentInput.length : null}</span>
            </form>)}
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
                      </h5>
                      <p>{body}</p>
                      {username === author && <button value={comment_id} onClick={deleteComment}>❌</button>}
                    </li>
                  );
                }
              )}
            </ul>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default FullReview;
