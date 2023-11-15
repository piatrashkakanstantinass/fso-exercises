import Blog from "./Blog";
import blogService from "../services/blogs";

const BlogList = ({ blogs, onIncreaseLike, onDelete }) => {
  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes);

  return sortedBlogs.map((blog) => (
    <Blog
      key={blog.id}
      blog={blog}
      onIncreaseLike={onIncreaseLike}
      onDelete={onDelete}
    />
  ));
};

export default BlogList;
