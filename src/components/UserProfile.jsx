import { useEffect, useState } from "react";
import { getReviewsByUsername } from "../api";

const UserProfile = ({user: {username, avatar_url, name}}) => {
  const [userReviews, setUserReviews] = useState([]);
  const [userComments, setUserComments] = useState([]);

//   useEffect(() => {
//     getReviewsByUsername(username).then((reviews) => {
//       setUserReviews(reviews);
//     });
//   });

  return (
    <div className="UserProfile">
      <h2>{name}</h2>
      <h3>{username}</h3>
      <img src={avatar_url} alt="" />
    </div>
  );
};

export default UserProfile;
