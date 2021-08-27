import { useEffect, useState } from "react";
import { getCategories, getReviews } from "../api";
import { Link, useParams, useHistory } from "react-router-dom";

const ReviewList = () => {
  const [reviews, setReviews] = useState([]);
  const [categories, setCategories] = useState([]);
  const { category } = useParams();
  const history = useHistory();

  const routeChange = () => {
    const selectBox = document.getElementById("category_dropdown");
    const selectedValue = selectBox.options[selectBox.selectedIndex].value;
    let path

    if (selectedValue === "") {
      path = `/`;
    } else {
      path = `/reviews/${selectedValue}`;
    }
    history.push(path);
  };

  useEffect(() => {
    getCategories().then((categories) => {
      setCategories(categories);
    });
  }, []);

  useEffect(() => {
    getReviews(category).then((reviews) => {
      setReviews(reviews);
    });
  }, [category]);

  return (
    <div className="ReviewList">
      <h2>{!category ? 'All' : prettifyText(category)} reviews</h2>
      <label>
        <select
          id="category_dropdown"
          defaultValue=""
          onChange={() => routeChange()}
        >
          <option value="">All</option>
          {categories.map(({ slug }) => {
            return (
              <option key={slug} value={slug}>
                {prettifyText(slug)}
              </option>
            );
          })}
        </select>
      </label>
      <ul>
        {reviews.map(({ review_id, title, owner, category }) => {
          return (
            <li key={review_id} className="review_card">
              <h2>{title}</h2>
              <p>by {owner}</p>
              <p>{category}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ReviewList;

function prettifyText(str) {
    return str[0].toUpperCase() + str.slice(1).replace(/-/g, ' ')
}
