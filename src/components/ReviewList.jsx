import { useEffect, useState } from "react";
import { getReviews } from "../api";

const ReviewList = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
      getReviews().then((reviews) => {
          setReviews(reviews);
      })
  }, []);

  return <div className="ReviewList">
      <ul>
          {reviews.map(({review_id, title, owner}) => {
              return <li key={review_id} className="review_card">
                  <h2>{title}</h2>
                  <p>by {owner}</p>
              </li>
          })}
      </ul>
  </div>;
};

export default ReviewList;
