import { useState } from "react";
import { useHistory } from "react-router-dom";
import { postReview } from "../api";
import { prettifyText } from "../utils/helper-functions";

const PostReview = ({ categories, username }) => {
  const [categoryInput, setCategoryInput] = useState("");
  const [titleInput, setTitleInput] = useState("");
  const [imageInput, setImageInput] = useState("");
  const [bodyInput, setBodyInput] = useState("");
  const [error, setError] = useState(false);
  const history = useHistory();

  const createReview = (event) => {
    event.preventDefault();
    const newReview = {
      owner: username,
      title: titleInput,
      review_img_url: imageInput,
      review_body: bodyInput,
      designer: "Uncredited",
      category: categoryInput,
    };
    postReview(newReview)
      .then(({ review_id }) => {
        setError(false);
        history.push(`/reviews/${review_id}`);
      })
      .catch(() => {
        setError(true);
      });
  };

  return (
    <div>
      <h3>Submit a review</h3>
      <form onSubmit={(event) => createReview(event)}>
        <label>
          Category:
          <select required defaultValue="" onChange={({ target: { value } }) => setCategoryInput(value)}>
            <option disabled value="">Pick a category</option>
            {categories.map(({ slug }) => {
              return (
                <option key={slug} value={slug}>
                  {prettifyText(slug)}
                </option>
              );
            })}
          </select>
        </label>
        <br />
        <label>
          Title:
          <input
            required
            type="text"
            maxLength="140"
            placeholder="Add a title"
            value={titleInput}
            onChange={({ target: { value } }) => setTitleInput(value)}
          />
        </label>
        <br />
        <label>
          Image URL:
          <input
            type="url"
            maxLength="140"
            placeholder="Add an image link"
            value={imageInput}
            onChange={({ target: { value } }) => setImageInput(value)}
          />
        </label>
        <label>
          <textarea
            required
            cols="30"
            rows="10"
            maxLength="500"
            placeholder="Add review text"
            value={bodyInput}
            onChange={({ target: { value } }) => setBodyInput(value)}
          />
        </label>
        <br />
        <button>Submit</button>
      </form>
      {error && <p className="error">Oops! Something went wrong.</p>}
    </div>
  );
};

export default PostReview;
