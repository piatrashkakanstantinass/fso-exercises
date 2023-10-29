const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const helper = require("./test_helper");
const api = supertest(app);
const Blog = require("../models/blog");

beforeEach(async () => {
  await Blog.deleteMany({});
  for (const blog of helper.initialBlogs) {
    await new Blog(blog).save();
  }
});

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("all blogs are returned", async () => {
  const response = await api.get("/api/blogs");

  expect(response.body).toHaveLength(helper.initialBlogs.length);
});

test("every blog has id", async () => {
  const response = await api.get("/api/blogs");

  response.body.forEach((blog) => expect(blog.id).toBeDefined());
});

test("POST request creates a new blog", async () => {
  const newBlog = {
    title: "Cooking with Bob",
    author: "Bob Stevenson",
    url: "https://random.org",
    likes: 14,
  };
  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);
  expect(
    blogsAtEnd.map((blog) => {
      return { ...blog, id: undefined };
    })
  ).toContainEqual(newBlog);
});

test("likes defaults to 0 if missing", async () => {
  const newBlog = {
    title: "Cooking with Bob",
    author: "Bob Stevenson",
    url: "https://random.org",
  };
  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  expect(
    blogsAtEnd.map((blog) => {
      return { ...blog, id: undefined };
    })
  ).toContainEqual({ ...newBlog, likes: 0 });
});

test("title is required during creation", async () => {
  const newBlog = {
    author: "Bob Stevenson",
    url: "https://random.org",
  };
  await api.post("/api/blogs").send(newBlog).expect(400);

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
});

test("url is required during creation", async () => {
  const newBlog = {
    author: "Bob Stevenson",
    title: "Great blog by Bob",
  };
  await api.post("/api/blogs").send(newBlog).expect(400);

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
});

afterAll(async () => {
  await mongoose.connection.close();
});
