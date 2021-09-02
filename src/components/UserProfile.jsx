import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { deleteReviewById, getReviews } from "../api";
import { getTimeSince, prettifyText } from "../utils/helper-functions";

const UserProfile = ({
  user: { username, avatar_url, name, total_likes },
  setLoggedInAs,
}) => {
  const [userReviews, setUserReviews] = useState([]);
  const [reviewsTotal, setReviewsTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [postDeleted, setPostDeleted] = useState(false);
  const history = useHistory();

  //   const [userComments, setUserComments] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    getReviews({ owner: username }).then(({ reviews, total_count }) => {
      setPostDeleted(false);
      setIsLoading(false);
      setUserReviews(reviews);
      setReviewsTotal(total_count);
    });
  }, [username, postDeleted]);

  const deletePost = (review_id) => {
    deleteReviewById(review_id).then(() => {
      setPostDeleted(true);
    });
  };

  const logOut = () => {
    setLoggedInAs({});
    history.push("/");
  };

  if (isLoading) return <p className="loading">Loading...</p>;
  return (
    <div className="UserProfile">
      <h2>My Profile</h2>
      <div className="profile__card">
        <img src={avatar_url} alt="" className="profile__img" />
        <div className="profile__info">
            <h4>Username: {username}</h4>
            <h4>Name: {name}</h4>
            <h4>Total likes: {total_likes ? total_likes : 0}</h4>
        </div>
      </div>
      <h2>{`My Reviews (${reviewsTotal})`}</h2>
      <ul>
        {userReviews.map(
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
              <li key={review_id} className="review_card">
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
                  <button
                    value={review_id}
                    onClick={({ target: { value } }) => deletePost(value)}
                  >
                    ❌
                  </button>
                </div>
              </li>
            );
          }
        )}
      </ul>
      <button onClick={logOut}>Log out</button>
      {/* <button onClick={deleteAccount}>Delete account</button> */}
    </div>
  );
};

export default UserProfile;
