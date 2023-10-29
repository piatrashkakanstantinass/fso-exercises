const listHelper = require("../utils/list_helper");
const helper = require("./test_helper");

const listWithOneBlog = [
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
];

test("dummy returns one", () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});

describe("total likes", () => {
  test("of empty list is zero", () => {
    expect(listHelper.totalLikes([])).toBe(0);
  });

  test("when list has only one blog, equals the likes of that", () => {
    expect(listHelper.totalLikes(listWithOneBlog)).toBe(5);
  });

  test("of a bigger list is calculated right", () => {
    expect(listHelper.totalLikes(helper.initialBlogs)).toBe(36);
  });
});

describe("favorite blogs", () => {
  test("of empty list is null", () => {
    expect(listHelper.favoriteBlog([])).toBe(null);
  });

  test("when list has only one blog, equals the blog", () => {
    expect(listHelper.favoriteBlog(listWithOneBlog)).toEqual(
      listWithOneBlog[0]
    );
  });

  test("of a bigger list is calculated right", () => {
    expect(listHelper.favoriteBlog(helper.initialBlogs)).toEqual({
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
    });
  });
});

describe("most blogs", () => {
  test("of empty list is null", () => {
    expect(listHelper.mostBlogs([])).toBe(null);
  });

  test("when list has only one blog, returns info from blog", () => {
    expect(listHelper.mostBlogs(listWithOneBlog)).toEqual({
      author: "Edsger W. Dijkstra",
      blogs: 1,
    });
  });

  test("of a bigger list is calculated right", () => {
    expect(listHelper.mostBlogs(helper.initialBlogs)).toEqual({
      author: "Robert C. Martin",
      blogs: 3,
    });
  });
});

describe("most likes", () => {
  test("of empty list is null", () => {
    expect(listHelper.mostLikes([])).toBe(null);
  });

  test("when list has only one blog, returns info from blog", () => {
    expect(listHelper.mostLikes(listWithOneBlog)).toEqual({
      author: "Edsger W. Dijkstra",
      likes: 5,
    });
  });

  test("of a bigger list is calculated right", () => {
    expect(listHelper.mostLikes(helper.initialBlogs)).toEqual({
      author: "Edsger W. Dijkstra",
      likes: 17,
    });
  });
});
