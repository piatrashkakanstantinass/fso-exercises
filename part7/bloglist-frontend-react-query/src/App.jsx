import Login from "./components/Login";
import BlogList from "./components/BlogList";
import BlogForm from "./components/BlogForm";
import { useState } from "react";
import blogService from "./services/blogs";
import Notification from "./components/Notification";
import Toggleable from "./components/Toggleable";
import {
  setNotification,
  useNotification,
} from "./contexts/NotificationContext";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { setUser, unsetUser, useUser } from "./contexts/UserContext";
import { Routes, Route, Link } from "react-router-dom";
import UserList from "./components/UserList";
import User from "./components/User";

const App = () => {
  const queryClient = useQueryClient();
  const [user, dispatchUser] = useUser();
  const [notification, notificationDispatch] = useNotification();
  const [messageIsError, setMessageIsError] = useState(false);

  const blogsQuery = useQuery({
    queryKey: ["blogs"],
    queryFn: blogService.getAll,
  });

  const updateBlogMutation = useMutation(async (newBlog) => {
    const id = newBlog.id;
    const updatedBlog = await blogService.update(id, newBlog);
    queryClient.setQueryData(["blogs"], (old) =>
      old.map((o) => (o.id === id ? updatedBlog : o)),
    );
  });

  const deleteBlogMutation = useMutation(async (id) => {
    await blogService.deleteBlog(id);
    queryClient.setQueryData(["blogs"], (old) =>
      old.filter((o) => o.id !== id),
    );
  });

  const createBlogMutation = useMutation(
    async (newBlog) => {
      const returnedBlog = await blogService.create(newBlog);
      queryClient.setQueryData(["blogs"], (old) => [...old, returnedBlog]);
      setMessageIsError(false);
      notificationDispatch(
        setNotification(
          `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`,
        ),
      );
    },
    {
      onError: (error) => {
        setMessageIsError(true);
        notificationDispatch(setNotification(error.response.data.error));
      },
    },
  );

  if (!user) {
    return <Login onLogin={(u) => dispatchUser(setUser(u))} />;
  }

  if (blogsQuery.isLoading) {
    return <span>Loading...</span>;
  }

  if (blogsQuery.isError) {
    return <span>Error: {blogService.error.message}</span>;
  }

  const blogs = blogsQuery.data;

  async function handleSubmit(title, author, url) {
    createBlogMutation.mutate({ title, author, url });
  }

  function handleLikeIncrease(id) {
    const blog = blogs.find((b) => b.id === id);
    if (blog === null) {
      return;
    }
    const updatedBlog = { ...blog, likes: blog.likes + 1 };
    updateBlogMutation.mutate(updatedBlog);
  }

  function handleDelete(id) {
    deleteBlogMutation.mutate(id);
  }

  return (
    <>
      <h1>blogs</h1>
      <nav>
        <ul className="flex list-none gap-x-5">
          <li>
            <Link to="/blogs">Blogs</Link>
          </li>
          <li>
            <Link to="/createBlog">Create blog</Link>
          </li>
          <li>
            <Link to="/users">Users</Link>
          </li>
        </ul>
      </nav>
      <Notification error={messageIsError}>{notification}</Notification>
      <p>
        {user.username} logged in{" "}
        <button onClick={() => dispatchUser(unsetUser())}>logout</button>
      </p>
      <Routes>
        <Route
          path="/createBlog"
          element={<BlogForm onSubmit={handleSubmit} />}
        />
        <Route
          path="/blogs"
          element={
            <BlogList
              blogs={blogs}
              onIncreaseLike={handleLikeIncrease}
              onDelete={handleDelete}
            />
          }
        />
        <Route path="/users" element={<UserList />} />
        <Route path="/users/:id" element={<User />} />
      </Routes>
    </>
  );
};

export default App;
