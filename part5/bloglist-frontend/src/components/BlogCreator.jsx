import { useState } from "react";
import blogService from "../services/blogs";

const BlogCreator = ({ onCreate, onCreateFail }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const newBlog = await blogService.create({ title, author, url });
      onCreate(newBlog);
    } catch (error) {
      onCreateFail(error.response.data);
    }
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
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

export default BlogCreator;
