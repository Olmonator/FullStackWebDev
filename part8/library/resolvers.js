const { UserInputError, AuthenticationError } = require('apollo-server')
const { v1: uuid } = require('uuid')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
const jwt = require('jsonwebtoken') 
const JWT_SECRET = 'NEED_HERE_A_SECRET_KEY'

const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const resolvers = {
  Query: {
    authorCount: async () => await Author.collection.countDocuments(),
    allAuthors: async () => await Author.find({}),
    allBooks: async (root, args) => {
      // filter for authors missing
      if (!args.author) {
          if (!args.genre) {
              return Book
                .find({})
                .populate('author')
          }
          return Book
            .find({ genres: args.genre})      
            .populate('author')
      }
      if (!args.genre) {
          return Book
            .find({})
            .populate('author') 
      }
      return Book
        .find({}) 
        .populate('author')
    },
    bookCount: async (root, args) => {
        if (!args.name) {
            return await Book.collection.countDocuments()
        }
        const author = await Author.find({ name: args.name })
        return author.bookCount
    },
    me: async (root, args, context) => {
      console.log(context.currentUser)
      return context.currentUser
    }
  },
  Mutation: {
    addAuthor: async (root, args) => {
        const author = new Author({ ... args, id: uuid(), bookCount: 0})
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
      // getting user
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }

      // finding author
      const authorFound = await Author.findOne({ name: args.author})
      const author = authorFound ? authorFound : new Author({ name: args.author, id: uuid(), bookCount: 0})
      
      // updating author
      author.bookCount = author.bookCount + 1
      try {
        author.save()
      } catch (error) {
        console.log('UPDATING AUTHOR ERROR: ', error.message)
      }

      // creatkng new book
      const book = new Book ({ ...args, author: author, id: uuid() })
      try {
        await book.save()  
      } catch (exception) {
        throw new UserInputError(exception.message, {
          invalidArgs: args,
        })
      }
      
      // add book to subscriberlist
      pubsub.publish('BOOK_ADDED', { bookAdded: book })

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
  },
  Subscription: {    
    bookAdded: {      
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])    
    },  
  },
}

module.exports = resolvers