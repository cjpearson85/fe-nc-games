import { Link } from "react-router-dom";

const Sidebar = ({
  loggedInAs: { username, name, avatar_url },
  setLoggedInAs,
}) => {
  return (
    <nav className="Sidebar">
      {!name ? (
        <>
          <img
            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
            alt=""
          />
          <h3>Guest</h3>
        </>
      ) : (
        <Link to={`/users/${username}`}>
          <img src={avatar_url} alt="" />
          <h3>{name}</h3>
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
            <Link to="/" onClick={() => setLoggedInAs({})}>
              Log Out
            </Link>
          )}
        </li>
        <li>
          <Link to="/users">Users</Link>
        </li>
        {/* <li>Dark mode</li> */}
      </ul>
    </nav>
  );
};

export default Sidebar;
