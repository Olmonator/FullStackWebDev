import React from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS, ME } from '../queries'

const Recommendations = (props) => {
  const userResult = useQuery(ME)

  console.log('REC_userResult: ', userResult)
  const genre = userResult?.data?.me?.favoriteGenre
  const bookResult = useQuery(ALL_BOOKS, {
    skip: !genre,
    variables: {genre}})

  if (!props.show) {
    return null
  }
  if (bookResult.loading) {
    return <div>loading...</div>
  }
  const books = bookResult.data.allBooks
  console.log('REC_bookResults: ', bookResult)
  return (
    <div>
      <h2>Recommended Books</h2>
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
            {books.map(a =>
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            )}
        </tbody>
      </table>
    </div>
  )
}

export default Recommendations