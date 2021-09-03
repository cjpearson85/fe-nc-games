import { useEffect, useState } from "react";
import { getCategories, getReviews } from "../api";
import { useParams, useHistory, generatePath } from "react-router-dom";
import {
  createRef,
  getTimeSince,
  prettifyText,
} from "../utils/helper-functions";
import PostReview from "./PostReview";

const ReviewList = ({ loggedInAs: { username } }) => {
  const [reviews, setReviews] = useState([]);
  const [categories, setCategories] = useState([]);
  const [sortBy, setSortBy] = useState("created_at");
  const [searchInput, setSearchInput] = useState("");
  const [searchWord, setSearchWord] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewTotal, setReviewTotal] = useState(0);
  const [page, setPage] = useState(1);
  const { category } = useParams();
  const history = useHistory();

  const routeChange = ({ value }) => {
    let path;

    if (Object.is(parseInt(value), NaN)) {
      value === "all"
        ? (path = `/`)
        : (path = generatePath("/categories/:category", { category: value }));
    } else {
      path = generatePath("/reviews/:review_id", { review_id: value });
    }
    history.push(path);
  };

  useEffect(() => {
    getCategories().then((categories) => {
      setCategories(categories);
    });
  }, []);

  useEffect(() => {
    setIsLoading(true);
    getReviews({ category, sort_by: sortBy, title: searchWord }).then(
      ({ reviews, total_count }) => {
        setPage(1);
        setIsLoading(false);
        setReviewTotal(total_count);
        setReviews(reviews);
      }
    ).catch((err) => {
        history.push("/");
    });
  }, [category, sortBy, searchWord]);

  useEffect(() => {
    setIsLoading(true);
    getReviews({ category, sort_by: sortBy, title: searchWord, p: page }).then(
      ({ reviews }) => {
        setIsLoading(false);
        setReviews(reviews);
      }
    );
  }, [page]);

  const categoryLookup = createRef(categories, "slug", "description");

  if (isLoading) return <p className="loading">Loading...</p>;
  return (
    <div className="ReviewList">
      <div className="review-options">
          <h2>
            {!category ? "All" : prettifyText(category)} reviews ({reviewTotal})
          </h2>
          {category ? <p>{categoryLookup[category]}</p> : null}
          <label>
            Category:{" "}
            <select
              defaultValue={category || "all"}
              onChange={({ target }) => routeChange(target)}
            >
              <option value="all">All</option>
              {categories.map(({ slug }) => {
                return (
                  <option key={slug} value={slug}>
                    {prettifyText(slug)}
                  </option>
                );
              })}
            </select>
          </label>
          <br/>
          <label>
            {" "}
            Sort By:{" "}
            <select
              defaultValue={sortBy}
              onChange={({ target: { value } }) => setSortBy(value)}
            >
              <option value="created_at">Newest</option>
              <option value="votes">Most likes</option>
              <option value="comment_count">Most comments</option>
            </select>
          </label>
          {/* <button
            onClick={({ target: { value } }) => {
              setOrder(value);
            }}
            value={order === "asc" ? "desc" : "asc"}
          >
            {order === "asc" ? "Desc" : "Asc"}
          </button> */}
          <form
            onSubmit={(event) => {
              event.preventDefault();
              setSearchWord(searchInput);
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
            <button type="submit">Search</button>
            <button
              type="reset"
              onClick={() => {
                setSearchInput("");
                setSearchWord("");
                setSortBy("created_at");
                setPage(1);
              }}
            >
              Reset
            </button>
          </form>
          {username && (<button onClick={() => setShowReviewForm((curr) => !curr)}>
            {showReviewForm ? "Hide form" : "Post new review"}
          </button>)}
          {showReviewForm && <PostReview categories={categories} username={username}/>}
          {!reviews.length ? <p className="page">No results found</p> : (<p className="no-results">
            Page {page} of {Math.ceil(reviewTotal / 10)}
          </p>)}
      </div>
      <ul>
        {reviews.map(
          ({
            review_id,
            title,
            owner,
            avatar_url,
            category,
            review_img_url,
            created_at,
            votes,
            comment_count,
          }) => {
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
                    <p><img className="small__avatar" src={avatar_url} alt="" />{owner}</p>
                    <div className="votes_comments_count">
                      <p>{`❤️   ${votes}`}</p>
                      <p>{`💬   ${comment_count}`}</p>
                    </div>
                </div>
              </li>
            );
          }
        )}
      </ul>
      {page < Math.ceil(reviewTotal / 10) && (
        <div className="page-button">
            <button onClick={() => setPage((currPage) => currPage + 1)}>
              Load more
            </button>
        </div>
      )}
    </div>
  );
};

export default ReviewList;
