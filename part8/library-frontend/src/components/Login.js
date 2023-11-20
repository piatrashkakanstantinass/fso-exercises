import { useMutation } from "@apollo/client";
import { LOGIN } from "../queries";
import { useSetToken } from "../contexts/TokenContext";
import { useEffect } from "react";

export default function Login({ show }) {
  const [login, result] = useMutation(LOGIN);
  const setToken = useSetToken();

  useEffect(() => {
    if (result.data) {
      setToken(result.data.login.value);
    }
  }, [result.data, setToken]);

  if (!show) return null;

  async function handleSubmit(e) {
    e.preventDefault();
    login({
      variables: {
        username: e.target.name.value,
        password: e.target.password.value,
      },
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          name
          <input name="name" />
        </label>
      </div>
      <div>
        <label>
          password
          <input name="password" type="password" />
        </label>
      </div>
      <button>login</button>
    </form>
  );
}
