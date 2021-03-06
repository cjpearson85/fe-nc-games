import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getUsers } from "../api";
import Loader from "./Loader";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [sortBy, setSortBy] = useState("username-asc");
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    setIsLoading(true);
    getUsers(sortBy).then((users) => {
      setIsLoading(false);
      setUsers(users);
    });
  }, [sortBy]);

  if (isLoading) return <Loader />;
  return (
    <div className="UsersList">
      <div className="users-options">
        <h2 style={{ marginBottom: '1rem' }}>Users</h2>
        <div className="input-selects">
          <label>
            <select
              defaultValue={sortBy}
              onChange={({ target: { value } }) => setSortBy(value)}
            >
              <option value="username-asc">Alphabetical (A-Z)</option>
              <option value="username-desc">Alphabetical (Z-A)</option>
              <option value="total_likes-desc">Most likes</option>
            </select>
          </label>
        </div>
      </div>
      <ul>
        {users.map(({ username, avatar_url, name, total_likes }) => {
          return (
            <li
              key={username}
              onClick={() => history.push(`/users/${username}`)}
            >
              <div className="profile__card">
                <img
                  src={
                    avatar_url !== ''
                      ? avatar_url
                      : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
                  }
                  alt=""
                  className="profile__img"
                />
                <div className="profile__info">
                  <h4>Username: {username}</h4>
                  <h4>Name: {name}</h4>
                  <h4>Total likes: {total_likes ? total_likes : 0}</h4>
                </div>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
};

export default UsersList;
