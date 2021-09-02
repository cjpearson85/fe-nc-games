import { useEffect, useState } from "react";
import { getCategories, getReviews } from "../api";
import { useParams, useHistory, generatePath } from "react-router-dom";
import { createRef, getTimeSince, prettifyText } from "../utils/helper-functions";

const ReviewList = () => {
  const [reviews, setReviews] = useState([]);
  const [categories, setCategories] = useState([]);
  const [sortBy, setSortBy] = useState("created_at");
  const [searchInput, setSearchInput] = useState("");
  const [searchWord, setSearchWord] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { category } = useParams();
  const history = useHistory();

  const routeChange = ({ value }) => {
    let path;

    if (Object.is(parseInt(value), NaN)) {
      value === "all"
        ? (path = `/`)
        : (path = generatePath("/reviews/:category", { category: value }));
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
    getReviews({category, sort_by: sortBy, title: searchWord}).then(({reviews}) => {
      setIsLoading(false);
      setReviews(reviews);
    });
  }, [category, sortBy, searchWord]);

  const categoryLookup = createRef(categories, 'slug', 'description');

  if (isLoading) return <p className="loading">Loading...</p>;
  return (
    <div className="ReviewList">
      <h2>{!category ? "All" : prettifyText(category)} reviews</h2>
      {category ? <p>{categoryLookup[category]}</p> : null}
      <label>
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
      <label>
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
        <button type="reset" onClick={() => {
            setSearchInput("");
            setSearchWord("");
        }}>Clear</button>
      </form>
      <ul>
        {reviews.map(
          ({
            review_id,
            title,
            owner,
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
                  <h3>{title}</h3>
                  <p>{`posted ${getTimeSince(created_at)}`}</p>
                  <p className="category_tag" value={category}>
                    {prettifyText(category)}
                  </p>
                </div>
                <p>{owner}</p>
                <div className="votes_comments_count">
                  <p>{`❤️   ${votes}`}</p>
                  <p>{`💬   ${comment_count}`}</p>
                </div>
              </li>
            );
          }
        )}
      </ul>
    </div>
  );
};

export default ReviewList;
