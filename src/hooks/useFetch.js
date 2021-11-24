import { useState, useEffect } from 'react'
import { getReviews } from '../api'
import { getCategories } from '../api'

function useFetch(queries, page) {
  const [isLoading, setIsLoading] = useState(true)
  const [initialLoad, setInitialLoad] = useState(true)
  const [error, setError] = useState(false)
  const [reviews, setReviews] = useState([])
  const [categories, setCategories] = useState([])
  const [reviewTotal, setReviewTotal] = useState(0)
  const [hasMore, setHasMore] = useState(false)

  useEffect(() => {
    setReviews([])
  }, [queries])

  useEffect(() => {
    setIsLoading(true)
    setError(false)

    if (initialLoad) {
      getCategories().then((categories) => {
        setCategories(categories)
      })
    }

    getReviews({ ...queries, p: page }).then(({ reviews, total_count }) => {
      setReviewTotal(total_count)
      setReviews((currentReviews) => [...currentReviews, ...reviews])
      setHasMore(reviews.length > 0)
      setInitialLoad(false)
      setIsLoading(false)
    })
  }, [queries, page])

  return {
    isLoading,
    error,
    reviews,
    categories,
    reviewTotal,
    hasMore,
    initialLoad,
  }
}

export default useFetch
