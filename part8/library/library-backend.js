const { ApolloServer, gql, UserInputError } = require('apollo-server')
const { v1: uuid } = require('uuid')
const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')
const MONGODB_URI = "mongodb+srv://lecholmo:mongoDBtest@cluster0.rmy6w.mongodb.net/library?retryWrites=true&w=majority"

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

let authors = ['']
let books = []

const typeDefs = gql`
  type Book {
      title: String!
      published: Int!
      author: Author!
      genres: [String!]!
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): Book

    addAuthor(
        name: String!
        born: Int
    ): Author

    editAuthor(
        name: String!
        setBornTo: Int!
    ): Author
  }

  type Author {
    name: String!
    born: Int
    bookCount: Int!
  }

  type Query {
      bookCount (name: String): Int!
      authorCount: Int!
      allBooks (author: String genre: String): [Book!]
      allAuthors: [Author!]!
  }
`

const resolvers = {
  Query: {
    authorCount: async () => await Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (!args.author) {
          if (!args.genre) {
              return Book
                .find({})
                .populate('author')
          }
          // implement filter
          return Book
            .find({ genres: args.genre})
            .populate('author')
      }
      // author || !genre
      if (!args.genre) {
          // implement filter
          return Book
            .find({})
            .populate('author') 
      }
      // author || genre
      return Book
        .find({}) 
        .populate('author')
    },
    allAuthors: async () => await Author.find({}),
    bookCount: async (root, args) => {
        if (!args.name) {
            return await Book.collection.countDocuments()
        }
        // implement filter
        const author = await Author.find({ name: args.name})
        console.log(author)
        const books = await Book.find({ author: author })
        console.log(books)
        return books ? books.length : 0
    }
  },
  Author: {
    bookCount: (root) => {
        //implement filter
        return Book.find({}).length
    }
  },
  Mutation: {
    addAuthor: async (root, args) => {
        const author = new Author({ ... args, id: uuid() })
        try {
          await author.save()
        } catch (exception) {
          throw new UserInputError(exception.message, {
            invalidArgs: args,
          })
        }
        return author
    },
    addBook: async (root, args) => {
      const authorFound = await Author.findOne({ name: args.author})
      const author = authorFound ? authorFound : new Author({ name: args.author, id: uuid() })
      if (!authorFound) {
        try {
          console.log('creating new author: ', author)
          author.save()
        } catch (exception) {
          throw new UserInputError(exception.message, {
            invalidArgs: args,
          })
        }
      }
      const book = new Book ({ ...args, author: author, id: uuid() })
      try {
        await book.save()
      } catch (exception) {
        throw new UserInputError(exception.message, {
          invalidArgs: args,
        })
      }
      // add new Author if neccessary
      return book
    },
    editAuthor: async (root, args) => {
        const author = await Author.findOne({ name: args.name })
        if (!author) {
            return null
        }
        author.born = args.setBornTo
        try {
          await author.save()
        } catch (exception) {
          throw new UserInputError(exception.message, {
            invalidArgs: args,
          })
        }
        return author
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})