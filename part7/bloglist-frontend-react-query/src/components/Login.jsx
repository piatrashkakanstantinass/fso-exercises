import { useState } from "react";
import loginService from "../services/login";
import useTimeoutMessage from "../hooks/useTimeoutMessage";
import Notification from "./Notification";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useTimeoutMessage();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const user = await loginService.login(username, password);
      onLogin(user);
    } catch (e) {
      setErrorMessage("Wrong credentials");
    }
  }

  return (
    <>
      <h2>log in to application</h2>
      <Notification error>{errorMessage}</Notification>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            username
            <input
              name="username"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            password
            <input
              name="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </div>
        <button>login</button>
      </form>
    </>
  );
};

export default Login;
