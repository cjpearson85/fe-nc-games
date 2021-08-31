import { useEffect, useState } from "react";
import { getCategories, getReviews } from "../api";
import { Link, useParams, useHistory, useLocation, generatePath } from "react-router-dom";

const ReviewList = () => {
  const [reviews, setReviews] = useState([]);
  const [categories, setCategories] = useState([]);
//   const [queries, setQueries] = useState(useQuery());
  const [order, setOrder] = useState();
  const { category } = useParams();
  const history = useHistory();

  //   let order = queries.get("order");
  //   console.log(order, '<<< reviewList');

  const routeChange = ({ value }) => {
    let path;

    if (Object.is(parseInt(value), NaN)) {
        value === "All" ? (path = `/`) : (path = generatePath("/reviews/:category", {category: value}));
    } else {
        path = generatePath("/reviews/:review_id", {review_id: value});
    }

    history.push(path);
  };

  useEffect(() => {
    getCategories().then((categories) => {
      setCategories(categories);
    });
  }, []);

  useEffect(() => {
    getReviews(category, order).then((reviews) => {
      setReviews(reviews);
    });
  }, [category, order]);

  return (
    <div className="ReviewList">
      <h2>{!category ? "All" : prettifyText(category)} reviews</h2>
      <label>
        <select onChange={({ target }) => routeChange(target)}>
          <option value="All">All</option>
          {categories.map(({ slug }) => {
            return (
              <option key={slug} value={slug}>
                {prettifyText(slug)}
              </option>
            );
          })}
        </select>
      </label>
      <button
        onClick={({ target: { value } }) => {
          //   queries.set("order", value);
          //   setQueries(queries);
          setOrder(value);
        }}
        // value="asc"
        value={order === "asc" ? "desc" : "asc"}
      >
        {/* asc */}
        {order === "asc" ? "Desc" : "Asc"}
      </button>
      <ul>
        {reviews.map(
          ({ review_id, title, owner, category, review_img_url }) => {
            return (
              <li key={review_id} className="review_card" onClick={() => routeChange({value: review_id})}>
                <img src={review_img_url} />
                <h2>{title}</h2>
                <p>by {owner}</p>
                <p>{category}</p>
              </li>
            );
          }
        )}
      </ul>
    </div>
  );
};

export default ReviewList;

function prettifyText(str) {
  return str[0].toUpperCase() + str.slice(1).replace(/-/g, " ");
}

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
