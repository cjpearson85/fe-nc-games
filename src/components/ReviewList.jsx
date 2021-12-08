import { useCallback, useRef, useState, useContext } from 'react'
import { AppUserContext } from '../App'
import { useParams, useHistory, generatePath } from 'react-router-dom'
import {
  createRef,
  getTimeSince,
  prettifyText,
} from '../utils/helper-functions'
import PostReview from './PostReview'
import Loader from './Loader'
import LoginPopup from './LoginPopup'
import useReviews from '../hooks/useReviews'
import search from '../images/icons8-search-24.png'
import reset from '../images/icons8-refresh-24.png'
import useCategories from '../hooks/useCategories'
import useToggle from '../hooks/useToggle'

const ReviewList = () => {
  const {
    loggedInAs: { username },
  } = useContext(AppUserContext)
  const { category } = useParams()

  const [sortBy, setSortBy] = useState('created_at')
  const [searchInput, setSearchInput] = useState('')
  const [page, setPage] = useState(1)
  const [queries, setQueries] = useState({ ...category })

  const [showReviewForm, toggleReviewForm] = useToggle()
  const [showLoginPrompt, toggleLoginPrompt] = useToggle()

  const { categoriesLoaded, categories } = useCategories()
  const { reviewsLoaded, reviews, reviewTotal, hasMore } = useReviews(
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

  const lastReviewElementRef = useCallback(
    (node) => {
      if (!reviewsLoaded) return
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prev) => prev + 1)
        }
      })
      if (node) observer.current.observe(node)
    },
    [reviewsLoaded, hasMore]
  )

  const categoryLookup = createRef(categories, 'slug', 'description')

  if (!categoriesLoaded && !reviewsLoaded) return <Loader />
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
        <button
          className="show-hide-button"
          onClick={username ? toggleReviewForm : toggleLoginPrompt}
        >
          + Post new review
        </button>
        <PostReview
          categories={categories}
          username={username}
          showReviewForm={showReviewForm}
          toggleReviewForm={toggleReviewForm}
        />
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
      {!reviews.length && reviewsLoaded && (
        <p className="no-results">No results found</p>
      )}
      {!reviewsLoaded && <Loader size="small" />}
      {showLoginPrompt && (
        <LoginPopup
          showLoginPrompt={showLoginPrompt}
          toggleLoginPrompt={toggleLoginPrompt}
        />
      )}
    </div>
  )
}

export default ReviewList
