import { useState } from "react";
import blogService from "../services/blogs";
import useUser from "../hooks/useUser";

const Blog = ({ blog, onChange }) => {
  const [user] = useUser();

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const [expanded, setExpanded] = useState(false);

  const increaseLikes = async () => {
    const updatedBlog = await blogService.update(blog.id, {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user?.id,
    });
    onChange(updatedBlog);
  };

  const deleteBlog = async () => {
    if (!confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      return;
    }
    await blogService.deleteBlog(blog.id);
    onChange(null);
  };

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={() => setExpanded(!expanded)}>
          {expanded ? "hide" : "view"}
        </button>
      </div>
      {expanded && (
        <>
          <div>{blog.url}</div>
          <div>
            {blog.likes}
            <button onClick={increaseLikes}>like</button>
          </div>
          <div>{blog.user?.name}</div>
          {user.username === blog.user?.username && (
            <div>
              <button onClick={deleteBlog}>delete</button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Blog;
