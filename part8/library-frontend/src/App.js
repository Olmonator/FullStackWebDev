import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import { useApolloClient, useSubscription } from '@apollo/client'
import { BOOK_ADDED, ALL_BOOKS } from './queries'
import Recommendations from './components/Recommendations'

export const updateCache = (cache, query, book) => {  
  const uniqByName = (a) => {   
    let seen = new Set()    
    return a.filter((item) => {      
      let k = item.title      
      console.log("filterinng books: ", k)
      return seen.has(k) ? false : seen.add(k)    
    })  
  }  
  cache.updateQuery( query, ({ allBooks }) => {        
    return {         
      allBooks: uniqByName(allBooks.concat(book)),        
    }
  })
}

const App = () => {
  const client = useApolloClient()

  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)

  const logout = () => {    
    setToken(null)    
    localStorage.clear()    
    client.resetStore()  
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const book = subscriptionData.data.bookAdded
      window.alert(`A new Book was added: ${book.title} by ${book.author.name} published in ${book.published}`)
      updateCache(client.cache, { query: ALL_BOOKS }, book)
    }
  })

  return (
    <div>
      <div style={{ float: 'left'}}>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token 
          ? <button onClick={() => setPage('add')}>add book</button>
          : null}
        {token
          ? <button onClick={() => setPage('recommended')}>recommendations</button>
          : null}
        
      </div>
      {!token ? <LoginForm setToken={setToken} /> : <button onClick={logout}>logout</button>}

      <Authors
        show={page === 'authors'}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
      />

      <Recommendations
        show={page === 'recommended'}
      />

    </div>
  )
}

export default App