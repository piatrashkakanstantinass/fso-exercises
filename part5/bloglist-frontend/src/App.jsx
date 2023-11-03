import Login from "./components/Login";
import useUser from "./hooks/useUser";
import BlogList from "./components/BlogList";
import BlogCreator from "./components/BlogCreator";
import { useState, useEffect } from "react";
import blogService from "./services/blogs";
import useTimeoutMessage from "./hooks/useTimeoutMessage";
import Notification from "./components/Notification";

const App = () => {
  const [user, setUser] = useUser();
  const [blogs, setBlogs] = useState([]);
  const [message, setMessage] = useTimeoutMessage();
  const [messageIsError, setMessageIsError] = useState(false);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  if (!user) {
    return <Login onLogin={(u) => setUser(u)} />;
  }

  return (
    <>
      <h2>blogs</h2>
      <Notification error={messageIsError}>{message}</Notification>
      <p>
        {user.username} logged in{" "}
        <button onClick={() => setUser(null)}>logout</button>
      </p>
      <BlogCreator
        onCreate={(newBlog) => {
          setBlogs(blogs.concat(newBlog));
          setMessageIsError(false);
          setMessage(`a new blog ${newBlog.title} by ${newBlog.author} added`);
        }}
        onCreateFail={(error) => {
          setMessageIsError(true);
          setMessage(error.error);
        }}
      />
      <BlogList blogs={blogs} />
    </>
  );
};

export default App;
