import { useState } from "react";
import { getUserByUsername } from "../api";

const Register = () => {
  const [usernameInput, setUsernameInput] = useState("");
  const [usernameValid, setUsernameValid] = useState();
  const [usernameAvailable, setUsernameAvailable] = useState(false);
  console.log(usernameValid, "<<< usernameValid");
  console.log(usernameAvailable, "<<< usernameAvailable");

  const [errorMsg, setErrorMsg] = useState("");

  const [nameInput, setNameInput] = useState("");
  const [avatarInput, setAvatarInput] = useState("");

  const checkUsername = () => {
    if (!/^[a-z0-9_]{5,20}$/.test(usernameInput)) {
      setErrorMsg("username must be between 5-20 characters, containing only letters, numbers and underscores");
      setUsernameValid(false);
    } else {
      setUsernameValid(true);
      getUserByUsername(usernameInput)
        .then(() => {
          setUsernameAvailable(false);
          setErrorMsg("username already taken");
        })
        .catch(() => {
          setUsernameAvailable(true);
        });
    }
  };

  return (
    <div className="Register">
      <h2>Register account</h2>
      <form>
        <label>
          Username:{" "}
          <input
            type="text"
            onChange={({ target: { value } }) => setUsernameInput(value)}
            onBlur={checkUsername}
          />
          {usernameInput === ""
            ? null
            : usernameValid && usernameAvailable
            ? " ✅"
            : ` ❌ ${errorMsg}`}
        </label>
        <br />
        <label>
          Name:{" "}
          <input
            type="text"
            onChange={({ target: { value } }) => setNameInput(value)}
          />
        </label>
        <br />
        <label>
          Avatar:{" "}
          <input
            type="text"
            onChange={({ target: { value } }) => setAvatarInput(value)}
          />
        </label>
        <button type="submit">Create account</button>
        <p className="error hidden">User not found</p>
      </form>
    </div>
  );
};

export default Register;
