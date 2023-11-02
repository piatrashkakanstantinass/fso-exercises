const Blog = require("../models/blog");
const user = require("../models/user");
const User = require("../models/user");
const blogsRouter = require("express").Router();
const middleware = require("../utils/middleware");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", "-blogs");
  response.json(blogs);
});

blogsRouter.post("/", middleware.userExtractor, async (request, response) => {
  const blog = new Blog({ ...request.body, user: request.user._id });
  const savedBlog = await blog.save();
  request.user.blogs = request.user.blogs.concat(savedBlog._id);
  await request.user.save();

  response.status(201).json(await savedBlog.populate("user", "-blogs"));
});

blogsRouter.delete(
  "/:id",
  middleware.userExtractor,
  async (request, response) => {
    const blog = await Blog.findById(request.params.id);
    if (!blog) {
      response.status(404).end();
      return;
    }
    if (!blog.user.equals(request.user._id)) {
      response.status(401).json({ error: "blog does not belong to a user" });
      return;
    }
    request.user.blogs = request.user.blogs.filter((blog) => blog !== blog._id);
    await request.user.save();
    await blog.deleteOne();

    response.status(204).end();
  }
);

blogsRouter.put("/:id", async (request, response) => {
  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    { ...request.body },
    {
      new: true,
      runValidators: true,
    }
  ).populate("user", "-blogs");
  response.json(updatedBlog);
});

module.exports = blogsRouter;
