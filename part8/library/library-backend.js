const { ApolloServer, gql, UserInputError, AuthenticationError } = require('apollo-server')
const { v1: uuid } = require('uuid')
const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
const jwt = require('jsonwebtoken') 

const JWT_SECRET = 'NEED_HERE_A_SECRET_KEY' 
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
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Book {
      title: String!
      published: Int!
      author: Author!
      genres: [String!]!
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
      me: User
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

    createUser(
      username: String!
      favoriteGenre: String!
    ): User

    login(
      username: String!
      password: String!
    ): Token
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
    },
    me: async (root, args, context) => {
      return context.curUser
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
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }
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
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser
      console.log('user: ', currentUser)
      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }
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
    },
    createUser: async (root, args) => {
      const user = new User({ 
        username: args.username,
        favoriteGenre: args.favoriteGenre,
      })

      return user
        .save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
  
      if ( !user || args.password !== 'secret' ) {
        throw new UserInputError("wrong credentials")
      }
  
      const userForToken = {
        username: user.username,
        id: user._id,
      }
  
      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {    
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(        
        auth.substring(7), JWT_SECRET      
      )
      console.log('token: ', decodedToken)
      const currentUser = await User.findById(decodedToken.id).populate('favoriteGenre')      
      return { currentUser }    
    }  
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})