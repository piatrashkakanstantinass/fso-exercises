const { ApolloServer } = require("@apollo/server");
const { GraphQLError } = require("graphql");
const { startStandaloneServer } = require("@apollo/server/standalone");
const Book = require("./models/book");
const Author = require("./models/author");
const mongoose = require("mongoose");
require("dotenv").config();

const typeDefs = `#graphql
  type Book {
    title: String!
    author: Author!
    published: String!
    genres: [String!]!
  }

  type Author {
    name: String!
    bookCount: Int!
    born: Int
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book!
    editAuthor(name: String!, setBornTo: Int!): Author
  }
`;

function applyFilter(value, filter, filterFunc) {
  if (filter === undefined) {
    return true;
  } else {
    return filterFunc(value, filter);
  }
}

function applyFilters(value, filters, filterFuncs) {
  for (let i = 0; i < filters.length && i < filterFuncs.length; ++i) {
    if (!applyFilter(value, filters[i], filterFuncs[i])) {
      return false;
    }
  }
  return true;
}

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, { author, genre }) => {
      const query = {};
      if (author != null) {
        const authorObj = await Author.findOne({ name: author });
        if (authorObj) {
          query.author = authorObj._id;
        }
      }
      if (genre != null) {
        query.genres = { $in: [genre] };
      }
      return Book.find(query);
    },
    allAuthors: async () => Author.find(),
  },
  Book: {
    author: async (root) => {
      const book = await Book.findOne({ title: root.title });
      return Author.findById(book.author);
    },
  },
  Author: {
    bookCount: async (root) => {
      const author = await Author.findOne({ name: root.name });
      if (!author) return 0;
      return Book.countDocuments({ author: author._id });
    },
  },
  Mutation: {
    addBook: async (root, args) => {
      let author = await Author.findOne({ name: args.author });
      if (!author) {
        try {
          author = await new Author({ name: args.author }).save();
        } catch (e) {
          throw new GraphQLError("Saving author failed", {
            extensions: {
              code: "BAD_USER_INPUT",
              invalidArgs: args.author,
              e,
            },
          });
        }
      }
      const book = new Book({ ...args, author: author._id });
      try {
        await book.save();
      } catch (e) {
        throw new GraphQLError("Saving book failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.title,
            e,
          },
        });
      }
      return book;
    },
    editAuthor: async (root, { name, setBornTo }) =>
      Author.findOneAndUpdate({ name }, { $set: { born: setBornTo } }),
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

mongoose.connect(process.env.MONGODB_URI);

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
