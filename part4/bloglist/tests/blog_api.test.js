const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const helper = require("./test_helper");
const api = supertest(app);
const Blog = require("../models/blog");
const User = require("../models/user");

let jwtToken;
let user = {
  username: "test_user",
  name: "test user",
};

beforeAll(async () => {
  await User.deleteMany({});
  const newUser = {
    username: user.username,
    password: "securepassword",
    name: user.name,
  };
  const creationResponse = await api.post("/api/users").send(newUser);
  user.id = creationResponse.body.id;
  const response = await api.post("/api/login").send({
    username: newUser.username,
    password: newUser.password,
  });
  jwtToken = response.body.token;
});

beforeEach(async () => {
  await Blog.deleteMany({});
  for (const blog of helper.initialBlogs) {
    await new Blog(blog).save();
  }
});

describe("getting blogs", () => {
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
});

describe("creating blog", () => {
  test("POST request creates a new blog", async () => {
    const newBlog = {
      title: "Cooking with Bob",
      author: "Bob Stevenson",
      url: "https://random.org",
      likes: 14,
    };
    await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${jwtToken}`)
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);
    expect(
      blogsAtEnd.map((blog) => {
        return { ...blog, user: undefined, id: undefined };
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
      .set("Authorization", `Bearer ${jwtToken}`)
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(
      blogsAtEnd.map((blog) => {
        return { ...blog, user: undefined, id: undefined };
      })
    ).toContainEqual({ ...newBlog, likes: 0 });
  });

  test("title is required during creation", async () => {
    const newBlog = {
      author: "Bob Stevenson",
      url: "https://random.org",
    };
    await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${jwtToken}`)
      .send(newBlog)
      .expect(400);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
  });

  test("url is required during creation", async () => {
    const newBlog = {
      author: "Bob Stevenson",
      title: "Great blog by Bob",
    };
    await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${jwtToken}`)
      .send(newBlog)
      .expect(400);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
  });

  test("user token is required", async () => {
    const newBlog = {
      author: "Bob Stevenson",
      title: "Great blog by Bob",
    };
    await api.post("/api/blogs").send(newBlog).expect(401);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
  });
});

describe("deleting blog", () => {
  let blogId;
  beforeEach(async () => {
    const blog = new Blog({
      title: "Test blog",
      url: "no-url.org",
      user: user.id,
    });
    const savedBlog = await blog.save();
    blogId = savedBlog._id.toString();
  });

  test("deletes a blog by id", async () => {
    const startingBlogs = await helper.blogsInDb();

    await api
      .delete(`/api/blogs/${blogId}`)
      .set("Authorization", `Bearer ${jwtToken}`)
      .expect(204);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(startingBlogs.length - 1);
    expect(blogsAtEnd).not.toContainEqual(
      startingBlogs.find((blog) => blog.id === blogId)
    );
  });

  test("handles malformatted id", async () => {
    await api
      .delete("/api/blogs/jk;fd9")
      .set("Authorization", `Bearer ${jwtToken}`)
      .expect(400);
  });
});

describe("updating blog", () => {
  test("updates a blog by id", async () => {
    const startingBlogs = await helper.blogsInDb();
    const blogId = startingBlogs[0].id;
    const blog = {
      title: "Updated blog",
      url: "cool-url.com",
      likes: 123,
    };

    await api.put(`/api/blogs/${blogId}`).send(blog).expect(200);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(startingBlogs.length);
    expect(
      blogsAtEnd.map((blog) => {
        return { title: blog.title, url: blog.url, likes: blog.likes };
      })
    ).toContainEqual(blog);
  });

  test("handles malformatted id", async () => {
    const blog = {
      title: "Updated blog",
      url: "cool-url.com",
      likes: 123,
    };
    await api.put("/api/blogs/jk;fd9").send(blog).expect(400);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
