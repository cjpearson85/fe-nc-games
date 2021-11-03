import { useCallback, useEffect, useRef, useState, useContext } from 'react'
import { getCategories } from '../api'
import { AppUserContext } from '../App'
import { useParams, useHistory, generatePath } from 'react-router-dom'
import {
  createRef,
  getTimeSince,
  prettifyText,
} from '../utils/helper-functions'
import PostReview from './PostReview'
import Loader from './Loader'
import useFetch from '../hooks/useFetch'
import search from '../images/icons8-search-24.png'
import reset from '../images/icons8-refresh-24.png'

const ReviewList = () => {
  const {
    loggedInAs: { username },
  } = useContext(AppUserContext)
  const [categories, setCategories] = useState([])
  const [sortBy, setSortBy] = useState('created_at')
  const [searchInput, setSearchInput] = useState('')
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [page, setPage] = useState(1)
  const { category } = useParams()
  const [queries, setQueries] = useState({ ...category })
  const { isLoading, reviews, reviewTotal, hasMore, initialLoad } = useFetch(
    queries,
    page
  )
  const observer = useRef()
  const history = useHistory()

  const routeChange = ({ value }) => {
    let path

    if (Object.is(parseInt(value), NaN)) {
      setPage(1)
      setQueries((currentQueries) => {
        const newCategory = { ...currentQueries }
        value === 'all'
          ? delete newCategory.category
          : (newCategory.category = value)
        return newCategory
      })
      value === 'all'
        ? (path = `/`)
        : (path = generatePath('/categories/:category', { category: value }))
    } else {
      path = generatePath('/reviews/:review_id', { review_id: value })
    }
    history.push(path)
  }

  useEffect(() => {
    getCategories().then((categories) => {
      setCategories(categories)
    })
  }, [])

  const lastReviewElementRef = useCallback(
    (node) => {
      if (isLoading) return
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prev) => prev + 1)
        }
      })
      if (node) observer.current.observe(node)
    },
    [isLoading, hasMore]
  )

  const categoryLookup = createRef(categories, 'slug', 'description')

  if (initialLoad) return <Loader />
  return (
    <div className="ReviewList">
      <div className="review-options">
        <h2>
          {!category ? 'All' : prettifyText(category)} reviews ({reviewTotal})
        </h2>
        {category ? <p>{categoryLookup[category]}</p> : null}
        <div className={`searchBar ${true && 'showSearchBar'}`}>
          <form
            className="searchInput"
            onSubmit={(event) => {
              event.preventDefault()
              setPage(1)
              setQueries((currentQueries) => {
                return { ...currentQueries, title: searchInput }
              })
            }}
          >
            <label>
              <input
                type="text"
                placeholder="Enter keyword"
                value={searchInput}
                onChange={({ target: { value } }) => setSearchInput(value)}
              />
            </label>
            <button className="searchButton" type="submit">
              <img src={search} alt="search_icon" className="search_icon" />
            </button>
          </form>
        </div>
        <div className="input-selects">
          <div>
            <label htmlFor="category-select">Category:</label>
            <select
              id="category-select"
              value={category || 'all'}
              onChange={({ target }) => routeChange(target)}
            >
              <option value="all">All</option>
              {categories.map(({ slug }) => {
                return (
                  <option key={slug} value={slug}>
                    {prettifyText(slug)}
                  </option>
                )
              })}
            </select>
          </div>
          <div>
            <label htmlFor="sort-select">Sort By:</label>
            <select
              id="sort-select"
              value={sortBy}
              onChange={({ target: { value } }) => {
                setPage(1)
                setSortBy(value)
                setQueries((currentQueries) => {
                  return { ...currentQueries, sort_by: value }
                })
              }}
            >
              <option value="created_at">Newest</option>
              <option value="votes">Most likes</option>
              <option value="comment_count">Most comments</option>
            </select>
          </div>
          <button
            className="reset"
            type="reset"
            onClick={() => {
              setSearchInput('')
              setQueries({})
              setSortBy('created_at')
              setPage(1)
              history.push('/')
            }}
          >
            <img src={reset} alt="reset_icon" className="reset_icon" />
          </button>
        </div>
        {username && (
          <button
            className="show-hide-button"
            onClick={() => setShowReviewForm((curr) => !curr)}
          >
            {showReviewForm ? 'Hide form' : '+ Post new review'}
          </button>
        )}
        {showReviewForm && (
          <PostReview categories={categories} username={username} />
        )}
      </div>
      <ul>
        {reviews.map(
          (
            {
              review_id,
              title,
              owner,
              avatar_url,
              category,
              review_img_url,
              created_at,
              votes,
              comment_count,
            },
            i
          ) => {
            return (
              <li
                key={review_id}
                ref={reviews.length === i + 1 ? lastReviewElementRef : null}
                className="review_card"
              >
                <img
                  src={review_img_url}
                  alt=""
                  onClick={() => routeChange({ value: review_id })}
                />
                <div
                  className="title_category"
                  onClick={() => routeChange({ value: review_id })}
                >
                  <h4>{title}</h4>
                  <p>{`posted ${getTimeSince(created_at)}`}</p>
                  <p className="category_tag" value={category}>
                    {prettifyText(category)}
                  </p>
                </div>
                <div className="review-card__bottom-line">
                  <div
                    className="avatar_username"
                    onClick={() => history.push(`/users/${owner}`)}
                  >
                    <img className="small__avatar" src={avatar_url} alt="" />
                    <p>{owner}</p>
                  </div>
                  <div className="votes_comments_count">
                    <p>❤️</p>
                    <p>{votes}</p>
                    <p>💬</p>
                    <p>{comment_count}</p>
                  </div>
                </div>
              </li>
            )
          }
        )}
      </ul>
      {!reviews.length && !isLoading && (
        <p className="no-results">No results found</p>
      )}
      {isLoading && <Loader size="small" />}
    </div>
  )
}

export default ReviewList
