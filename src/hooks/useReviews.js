import { useState, useEffect } from 'react'
import { getReviews } from '../api'

function useReviews(queries, page) {
  const [reviewsLoaded, setReviewsLoaded] = useState(false)
  const [reviews, setReviews] = useState([])
  const [reviewTotal, setReviewTotal] = useState(0)
  const [hasMore, setHasMore] = useState(false)

  useEffect(() => {
    setReviews([])
  }, [queries])

  useEffect(() => {
    setReviewsLoaded(false)

    getReviews({ ...queries, p: page }).then(({ reviews, total_count }) => {
      setReviewTotal(total_count)
      setReviews((currentReviews) => [...currentReviews, ...reviews])
      setHasMore(reviews.length > 0)
      setReviewsLoaded(true)
    })
  }, [queries, page])

  return {
    reviewsLoaded,
    reviews,
    reviewTotal,
    hasMore,
  }
}

export default useReviews
