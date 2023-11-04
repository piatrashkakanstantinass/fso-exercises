import { useState } from "react";
import useUser from "../hooks/useUser";

const Blog = ({ blog, onIncreaseLike, onDelete }) => {
  const [user] = useUser();

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const [expanded, setExpanded] = useState(false);

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
            <button onClick={onIncreaseLike}>like</button>
          </div>
          <div>{blog.user?.name}</div>
          {user && user.username === blog.user?.username && (
            <div>
              <button onClick={onDelete}>delete</button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Blog;
