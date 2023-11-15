import Blog from "./Blog";
import { Link } from "react-router-dom";

const BlogList = ({ blogs, onIncreaseLike, onDelete }) => {
  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes);

  return sortedBlogs.map((blog) => (
    <Link to={blog.id} key={blog.id}>
      <Blog blog={blog} onIncreaseLike={onIncreaseLike} onDelete={onDelete} />
    </Link>
  ));
};

export default BlogList;
