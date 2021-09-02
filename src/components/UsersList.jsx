import { useEffect, useState } from "react";
import { getUsers } from "../api";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [sortBy, setSortBy] = useState({order: "asc", sort_by: "username"});

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getUsers(sortBy).then((users) => {
      setIsLoading(false);
      setUsers(users);
    });
  }, [sortBy]);

  if (isLoading) return <p className="loading">Loading...</p>;
  return (
    <div className="UsersList">
      <h2>Users</h2>
      <label>
        <select
          defaultValue={sortBy}
          onChange={({ target: { value } }) => setSortBy(value)}
        >
          <option value={{order: "asc", sort_by: "username"}}>Alphabetical (A-Z)</option>
          <option value={{order: "desc", sort_by: "username"}}>Alphabetical (Z-A)</option>
          <option value={{order: "desc", sort_by: "total_likes"}}>Most likes</option>
        </select>
      </label>
      <ul>
        {users.map(({ username, avatar_url, name, total_likes }) => {
          return (
            <li key={username}>
              <div className="profile__card">
                <img src={avatar_url !== "" ? avatar_url : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"} alt="" className="profile__img" />
                <div className="profile__info">
                  <h4>Username: {username}</h4>
                  <h4>Name: {name}</h4>
                  <h4>Total likes: {total_likes ? total_likes : 0}</h4>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default UsersList;
