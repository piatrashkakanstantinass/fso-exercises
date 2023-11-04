import { useState } from "react";
import blogService from "../services/blogs";

const BlogForm = ({ onSubmit }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  return (
    <>
      <h2>create new</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(title, author, url);
        }}
      >
        <div>
          <label>
            title:
            <input
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            author:
            <input
              name="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            url:
            <input
              name="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </label>
        </div>
        <button>create</button>
      </form>
    </>
  );
};

export default BlogForm;
