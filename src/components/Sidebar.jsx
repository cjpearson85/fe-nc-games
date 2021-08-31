import { Link } from "react-router-dom";

const Sidebar = ({ loggedInAs: { name, avatar_url }, setLoggedInAs }) => {
  return (
    <div className="Sidebar">
      {!name ? (
        <h3>Guest</h3>
      ) : (
        <Link to="/profile">
          <h3>
            <img src={avatar_url} alt="" />
            {name}
          </h3>
        </Link>
      )}
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          {!name ? (
            <Link to="/login">Log In</Link>
          ) : (
            <p onClick={() => setLoggedInAs({})}>Log Out</p>
          )}
        </li>
        {!name ? null : <li>Profile</li>}
        <li>Dark mode</li>
      </ul>
    </div>
  );
};

export default Sidebar;
