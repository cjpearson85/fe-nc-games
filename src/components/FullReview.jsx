import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getComments, getReviewById } from "../api";

const FullReview = () => {
  const [review, setReview] = useState({});
  const [comments, setComments] = useState([]);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const { review_id } = useParams();
  const date = new Date(review.created_at);

  useEffect(() => {
    getReviewById(review_id).then((review) => {
      setReview(review);
    });
    getComments(review_id).then((comments) => {
      setComments(comments);
    });
  }, []);

  const toggleComments = () => {
    setCommentsOpen(currStatus => !currStatus);
  }

  return (
    <div className="FullReview">
      <img src={review.review_img_url} />
      <div className="review_body">
        <h2>{review.title}</h2>
        <p>posted {date.toString()}</p>
        <p>by {review.owner}</p>
        <p>{review.review_body}</p>
        <h4>{review.votes} likes</h4>
        <button>❤️</button>
        <h4>Comments ({review.comment_count})</h4>
        <button onClick={toggleComments}>{commentsOpen ? "Hide comments" : "Load comments"}</button>
        {commentsOpen ? (
          <ul>
            {comments.map(({ comment_id, author, body }) => {
              return (
                <li key={comment_id}>
                  <h4>{author}</h4>
                  <p>{body}</p>
                </li>
              );
            })}
          </ul>
        ) : null}
      </div>
    </div>
  );
};

export default FullReview;
