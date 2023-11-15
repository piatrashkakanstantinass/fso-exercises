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
import { useMutation, useQuery, useQueryClient } from "react-query";

const App = () => {
  const queryClient = useQueryClient();
  const [user, setUser] = useUser();
  const [notification, notificationDispatch] = useNotification();
  const [messageIsError, setMessageIsError] = useState(false);
  const [formVisible, setFormVisible] = useState(false);

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
      setFormVisible(false);
    },
    {
      onError: (error) => {
        setMessageIsError(true);
        notificationDispatch(setNotification(error.response.data.error));
      },
    },
  );

  if (!user) {
    return <Login onLogin={(u) => setUser(u)} />;
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
        onIncreaseLike={handleLikeIncrease}
        onDelete={handleDelete}
      />
    </>
  );
};

export default App;
