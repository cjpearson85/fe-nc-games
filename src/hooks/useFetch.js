import { useState, useEffect } from "react";
import { getReviews } from "../api";

function useFetch(queries, page) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [reviewTotal, setReviewTotal] = useState(0);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setReviews([]);
  }, [queries]);

  useEffect(() => {
    setIsLoading(true);
    setError(false);

    getReviews({ ...queries, p: page }).then(({reviews, total_count}) => {
        setReviewTotal(total_count);
        setReviews((currentReviews) => [...new Set([...currentReviews, ...reviews])]);
        setHasMore(reviews.length > 0);
        setIsLoading(false);
      })

  }, [queries, page]);



  return { isLoading, error, reviews, setReviews, reviewTotal, hasMore };
}

export default useFetch;