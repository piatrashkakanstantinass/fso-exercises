import Blog from "./Blog";

const BlogList = ({ blogs, onChange }) => {
  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes);

  return sortedBlogs.map((blog) => (
    <Blog
      key={blog.id}
      blog={blog}
      onChange={(newBlog) => {
        if (newBlog === null) {
          onChange(blogs.filter((b) => b.id !== blog.id));
        } else {
          onChange(blogs.map((b) => (b.id === blog.id ? newBlog : b)));
        }
      }}
    />
  ));
};

export default BlogList;
