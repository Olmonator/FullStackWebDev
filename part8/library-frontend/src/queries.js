import { gql  } from '@apollo/client'

const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    title
    published
    genres
    author {
      name
      born
      bookCount
    }
  }
`

export const ALL_AUTHORS = gql`
query {
  allAuthors {
    name
    born
    bookCount
  }
}
`

export const ALL_BOOKS = gql`
  query allBooks($genre: String){
    allBooks(
      genre: $genre
    ) {
      ...BookDetails
    }
  }
${BOOK_DETAILS}
`

export const ME = gql`
query {
  me {
    username
    favoriteGenre
    id
  }
}
`

export const CREATE_BOOK = gql`
mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
  addBook(
    title: $title,
    published: $published,
    author: $author,
    genres: $genres
  ) {
    title
    published
    genres
    author {
      name
      born
      bookCount
    }
  }
}
`

export const UPDATE_AUTHOR = gql`
mutation updateAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(
        name: $name,
        setBornTo: $setBornTo
    ){
        name
        born
    }
}
`

export const LOGIN = gql`
mutation login($username: String!, $password: String!) {
  login(
    username: $username
    password: $password
  ) {
    value
  }
}
`

export const BOOK_ADDED = gql`  
subscription {    
  bookAdded {      
    ...BookDetails    
  }  
}  ${BOOK_DETAILS}`