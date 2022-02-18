import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = (props) => {
  const result = useQuery(ALL_BOOKS)
  const [filter, setFilter] = useState(null)

  if (!props.show) {
    return null
  }
  if (result.loading) {
    return <div>loading...</div>
  }
  const books = result.data.allBooks
  console.log('queryResult: ', books)
  const genres = books.map(books => books.genres).flat()
  const uniqueGenres = genres.filter((val,id,array) => array.indexOf(val) === id)
  return (
    <div>
      <h2>books</h2>
      filter books by genre: {uniqueGenres ? uniqueGenres.map(genre => 
        genre !== filter 
          ? <button key={genre} onClick={() => setFilter(genre)}>{genre}</button>
          : <button key={genre} onClick={() => setFilter(genre)}><b>{genre}</b></button>
        )
      : null
      }
      <button onClick={() => setFilter(null)}>clear</button>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {!filter ? 
            books.map(a =>
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ) :
            books
              .filter(book => book.genres.includes(filter))
              .map(a =>
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            )
          }
        </tbody>
      </table>
    </div>
  )
}

export default Books