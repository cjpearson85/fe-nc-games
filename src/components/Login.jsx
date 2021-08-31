import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { getUserByUsername } from "../api";

const Login = ({ setLoggedInAs }) => {
  const [usernameInput, setUsernameInput] = useState("");
  const history = useHistory();

  const checkUsername = (event) => {
    event.preventDefault();
    getUserByUsername(usernameInput).then((user) => {
      setLoggedInAs(user);
      history.push("/profile");
    });
  };

  return (
    <div className="Login">
      <h2>Log In</h2>
      <form onSubmit={(event) => checkUsername(event)}>
        <label>
          Username:{" "}
          <input
            type="text"
            onChange={({ target: { value } }) => setUsernameInput(value)}
          />
        </label>
        <button type="submit">Submit</button>
        <p className="error hidden">User not found</p>
      </form>
      <p>Don't have an account? Click here to <Link to="/register">register</Link>.</p>
    </div>
  );
};

export default Login;
