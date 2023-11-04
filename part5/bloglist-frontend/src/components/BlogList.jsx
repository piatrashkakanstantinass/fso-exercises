import Blog from "./Blog";
import blogService from "../services/blogs";

const BlogList = ({ blogs, onChange }) => {
  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes);

  return sortedBlogs.map((blog) => (
    <Blog
      key={blog.id}
      blog={blog}
      onIncreaseLike={async () => {
        const updatedBlog = await blogService.update(blog.id, {
          ...blog,
          likes: blog.likes + 1,
          user: blog.user?.id,
        });
        onChange(blogs.map((b) => (b.id === blog.id ? updatedBlog : b)));
      }}
      onDelete={async () => {
        if (!confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
          return;
        }
        await blogService.deleteBlog(blog.id);
        onChange(() => blogs.filter((b) => b.id !== blog.id));
      }}
    />
  ));
};

export default BlogList;
