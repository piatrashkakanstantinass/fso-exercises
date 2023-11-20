import { useEffect, useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Login from "./components/Login";
import Recommend from "./components/Recommend";
import { useSetToken, useToken } from "./contexts/TokenContext";

const App = () => {
  const [page, setPage] = useState("authors");
  const token = useToken();
  const setToken = useSetToken();

  useEffect(() => {
    if (token !== null && page === "login") {
      setPage("authors");
    }
  }, [token, page]);

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("add")}>add book</button>
        {token !== null && (
          <button onClick={() => setPage("recommend")}>recommend</button>
        )}
        <button
          onClick={() => (token !== null ? setToken(null) : setPage("login"))}
        >
          {token !== null ? "logout" : "login"}
        </button>
      </div>

      <Authors show={page === "authors"} />

      <Books show={page === "books"} />

      <NewBook show={page === "add"} />

      <Recommend show={page === "recommend" && token !== null} />

      <Login show={page === "login"} />
    </div>
  );
};

export default App;
