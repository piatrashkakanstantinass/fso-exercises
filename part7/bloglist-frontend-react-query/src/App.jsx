import Login from "./components/Login";
import useUser from "./hooks/useUser";
import BlogList from "./components/BlogList";
import BlogForm from "./components/BlogForm";
import { useState, useEffect } from "react";
import blogService from "./services/blogs";
import Notification from "./components/Notification";
import Toggleable from "./components/Toggleable";
import {
  setNotification,
  useNotification,
} from "./contexts/NotificationContext";

const App = () => {
  const [user, setUser] = useUser();
  const [blogs, setBlogs] = useState([]);
  const [notification, notificationDispatch] = useNotification();
  const [messageIsError, setMessageIsError] = useState(false);
  const [formVisible, setFormVisible] = useState(false);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  if (!user) {
    return <Login onLogin={(u) => setUser(u)} />;
  }

  async function handleSubmit(title, author, url) {
    try {
      const newBlog = await blogService.create({ title, author, url });
      setBlogs(blogs.concat(newBlog));
      setMessageIsError(false);
      notificationDispatch(
        setNotification(
          `a new blog ${newBlog.title} by ${newBlog.author} added`,
        ),
      );
      setFormVisible(false);
    } catch (error) {
      setMessageIsError(true);
      notificationDispatch(setNotification(error.response.data.error));
    }
  }

  return (
    <>
      <h2>blogs</h2>
      <Notification error={messageIsError}>{notification}</Notification>
      <p>
        {user.username} logged in{" "}
        <button onClick={() => setUser(null)}>logout</button>
      </p>
      <Toggleable
        visible={formVisible}
        openText="new blog"
        onVisibleChange={(e) => setFormVisible(e)}
      >
        <BlogForm onSubmit={handleSubmit} />
      </Toggleable>
      <BlogList
        blogs={blogs}
        onChange={(newBlogList) => setBlogs(newBlogList)}
      />
    </>
  );
};

export default App;
