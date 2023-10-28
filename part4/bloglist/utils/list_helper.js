const _ = require("lodash");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((a, b) => a + b.likes, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }
  return blogs.reduce((a, b) => (b.likes > a.likes ? b : a));
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }
  [author, blogs] = _.chain(blogs)
    .countBy("author")
    .toPairs()
    .maxBy((o) => o[1]);
  return { author, blogs };
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }
  [author, likes] = _.chain(blogs)
    .groupBy("author")
    .mapValues((o) => _.sumBy(o, "likes"))
    .toPairs()
    .maxBy((o) => o[1])
    .value();
  return { author, likes };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
