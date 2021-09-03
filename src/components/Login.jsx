import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { getUserByUsername } from "../api";

const Login = ({ setLoggedInAs }) => {
  const [usernameInput, setUsernameInput] = useState("");
  const [userNotFound, setUserNotFound] = useState(false);
  const history = useHistory();

  const checkUsername = (event) => {
    event.preventDefault();
    getUserByUsername(usernameInput)
      .then((user) => {
        setLoggedInAs(user);
        history.push(`/users/${user.username}`);
      })
      .catch(() => {
        setUserNotFound(true);
      });
  };

  return (
    <div className="Login">
      <h2>Log In</h2>
      <form onSubmit={checkUsername}>
        <label>
          Username:{" "}
          <input
            type="text"
            onChange={({ target: { value } }) => setUsernameInput(value)}
          />
        </label>
        <button type="submit">Submit</button>
        {userNotFound ? <p className="error">User not found</p> : null}
      </form>
      <p>
        Don't have an account? Click here to{" "}
        <Link to="/register">register</Link>.
      </p>
    </div>
  );
};

export default Login;
