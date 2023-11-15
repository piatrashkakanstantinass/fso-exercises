import { useState } from "react";
import { useUser } from "../contexts/UserContext";

const Blog = ({
  blog,
  onIncreaseLike,
  onDelete,
  isExapnded = false,
  onPostComment,
}) => {
  const [user] = useUser();

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 5,
    paddingBottom: 10,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const [expanded, setExpanded] = useState(isExapnded);

  return (
    <div style={blogStyle} className="blog">
      <div>
        {blog.title} {blog.author}
        {/* <button className="blog-expand" onClick={() => setExpanded(!expanded)}>
          {expanded ? "hide" : "view"}
        </button> */}
      </div>
      {expanded && (
        <>
          <div>{blog.url}</div>
          <div>
            <span className="like-count">{blog.likes}</span>
            <button onClick={() => onIncreaseLike(blog.id)}>like</button>
          </div>
          <div>{blog.user?.name}</div>
          {user && user.username === blog.user?.username && (
            <div>
              <button onClick={() => onDelete(blog.id)}>delete</button>
            </div>
          )}
          <h3>Comments</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onPostComment(blog.id, e.target.comment.value);
            }}
          >
            <input name="comment" />
            <button>submit</button>
          </form>
          <ul>
            {blog.comments.map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default Blog;
