import { useCallback, useEffect, useRef, useState } from "react";
import { getCategories, getReviews } from "../api";
import { useParams, useHistory, generatePath } from "react-router-dom";
import {
  createRef,
  getTimeSince,
  prettifyText,
} from "../utils/helper-functions";
import PostReview from "./PostReview";
import Loader from "./Loader";
import useFetch from "../hooks/useFetch";
import search from '../images/icons8-search-24.png'

const ReviewList = ({ loggedInAs: { username }, searchOpen }) => {
  // const [reviews, setReviews] = useState([]);
  const [categories, setCategories] = useState([])
  const [sortBy, setSortBy] = useState('created_at')
  const [searchInput, setSearchInput] = useState('')
  const [searchWord, setSearchWord] = useState('')
  // const [isLoading, setIsLoading] = useState(true);
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [page, setPage] = useState(1)
  const { category } = useParams()
  const [queries, setQueries] = useState({ ...category })
  const {
    isLoading,
    error,
    reviews,
    setReviews,
    reviewTotal,
    hasMore,
    initialLoad,
  } = useFetch(queries, page)
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

  // useEffect(() => {
  //   setIsLoading(true);
  //   getReviews({ category, sort_by: sortBy, title: searchWord, p: page })
  //     .then(({ reviews, total_count }) => {
  //       setIsLoading(false);
  //       setReviewTotal(total_count);
  //       setReviews((currentReviews) => {
  //         return [...new Set([...currentReviews, ...reviews])];
  //       });
  //     })
  //     .catch(() => {
  //       history.push("/");
  //     });
  // }, [category, sortBy, searchWord, page]);

  // useEffect(() => {
  //   setIsLoading(true);
  //   getReviews({ category, sort_by: sortBy, title: searchWord, p: page }).then(
  //     ({ reviews }) => {
  //       setIsLoading(false);
  //       setReviews((currentReviews) => {
  //         return [...currentReviews, reviews]
  //       });

  //     }
  //   );
  // }, [page]);

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
      <div className={`searchBar ${searchOpen && 'showSearchBar'}`}>
        <form
          className="searchInput"
          onSubmit={(event) => {
            event.preventDefault()
            setPage(1)
            // setReviews([]);
            // setSearchWord(searchInput);
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
          {/* <button
            type="reset"
            onClick={() => {
              setSearchInput('')
              setQueries({})
              setSortBy('created_at')
              setPage(1)
            }}
          >
            Reset
          </button> */}
        </form>
      </div>
      <div className="review-options">
        <h2>
          {!category ? 'All' : prettifyText(category)} reviews ({reviewTotal})
        </h2>
        {category ? <p>{categoryLookup[category]}</p> : null}
        <label>
          Category:{' '}
          <select
            defaultValue={category || 'all'}
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
        </label>
        <br />
        <label>
          Sort By:{' '}
          <select
            defaultValue={sortBy}
            onChange={({ target: { value } }) => {
              setPage(1)
              // setReviews([]);
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
        </label>
        <br />
        {/* <button
            onClick={({ target: { value } }) => {
              setOrder(value);
            }}
            value={order === "asc" ? "desc" : "asc"}
          >
            {order === "asc" ? "Desc" : "Asc"}
          </button> */}
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
        {!reviews.length && <p className="page">No results found</p>}
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
            if (reviews.length === i + 1) {
              return (
                <li
                  key={review_id}
                  ref={lastReviewElementRef}
                  className="review_card"
                  onClick={() => routeChange({ value: review_id })}
                >
                  <img src={review_img_url} alt="" />
                  <div className="title_category">
                    <h4>{title}</h4>
                    <p>{`posted ${getTimeSince(created_at)}`}</p>
                    <p className="category_tag" value={category}>
                      {prettifyText(category)}
                    </p>
                  </div>
                  <div className="review-card__bottom-line">
                    <div className="avatar_username">
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
            } else {
              return (
                <li
                  key={review_id}
                  className="review_card"
                  onClick={() => routeChange({ value: review_id })}
                >
                  <img src={review_img_url} alt="" />
                  <div className="title_category">
                    <h4>{title}</h4>
                    <p>{`posted ${getTimeSince(created_at)}`}</p>
                    <p className="category_tag" value={category}>
                      {prettifyText(category)}
                    </p>
                  </div>
                  <div className="review-card__bottom-line">
                    <div className="avatar_username">
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
          }
        )}
      </ul>
      {isLoading && <Loader size="small" />}
      {/* {page < Math.ceil(reviewTotal / 10) && (
        <div className="page-button">
          <button onClick={() => setPage((currPage) => currPage + 1)}>
            Load more
          </button>
        </div>
      )} */}
    </div>
  )
}

export default ReviewList;
