import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { deleteReviewById, getReviews, getUserByUsername } from "../api";
import { getTimeSince, prettifyText } from "../utils/helper-functions";

const UserProfile = ({ loggedInAs, setLoggedInAs }) => {
  const [user, setUser] = useState({});
  const [userReviews, setUserReviews] = useState([]);
  const [reviewsTotal, setReviewsTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [postDeleted, setPostDeleted] = useState(false);
  const { username } = useParams();
  const history = useHistory();

  //   const [userComments, setUserComments] = useState([]);
  useEffect(() => {
    setIsLoading(true);
    getUserByUsername(username).then((user) => {
      setIsLoading(false);

      setUser(user);
    });
  }, [username]);

  useEffect(() => {
    setIsLoading(true);
    getReviews({ owner: username }).then(({ reviews, total_count }) => {
      setPostDeleted(false);
      setIsLoading(false);
      setUserReviews(reviews);
      setReviewsTotal(total_count);
    });
  }, [username, postDeleted]);

  const deletePost = ({ target: { value } }) => {
    deleteReviewById(value).then(() => {
      setPostDeleted(true);
    });
  };

  const myProfile = () => {
      return user.username === loggedInAs.username
  }

  const logOut = () => {
    setLoggedInAs({});
    history.push("/");
  };

  if (isLoading) return <p className="loading">Loading...</p>;
  return (
    <div className="UserProfile">
      <h2>{myProfile() ? "My Profile" : "Profile"}</h2>
      <div className="profile__card">
        <img src={user.avatar_url} alt="" className="profile__img" />
        <div className="profile__info">
          <h4>Username: {username}</h4>
          <h4>Name: {user.name}</h4>
          <h4>Total likes: {user.total_likes ? user.total_likes : 0}</h4>
        </div>
      </div>
      <h2>{myProfile() ? `My Reviews (${reviewsTotal})` : `Reviews (${reviewsTotal})`}</h2>
      <ul>
        {userReviews.map(
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
              <li key={review_id} className="review_card">
                <img src={review_img_url} alt="" onClick={() => history.push(`/reviews/${review_id}`)}/>
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
                      {myProfile() && <button
                        disabled={!myProfile()}
                        value={review_id}
                        onClick={deletePost}
                      >
                        ❌
                      </button>}
                    </div>
                </div>
              </li>
            );
          }
        )}
      </ul>
      {myProfile() && <button disabled={!myProfile()} onClick={logOut}>Log out</button>}
      {/* <button onClick={deleteAccount}>Delete account</button> */}
    </div>
  );
};

export default UserProfile;
