import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { ALL_AUTHORS, UPDATE_AUTHOR } from '../queries'
import EditAuthor from './EditAuthor'

const Authors = (props) => {
  const [name, setName] = useState('')

  const [ updateAuthor ] = useMutation(UPDATE_AUTHOR,
    {refetchQueries: [{ query: ALL_AUTHORS} ]  })


  const handleEdit = (author) => {
    setName(author)
  }

  const handleSubmit = (setBornTo) => {
    updateAuthor({ variables: { name, setBornTo } })
    setName('')
  }

  const result = useQuery(ALL_AUTHORS)
  if (!props.show) {
    return null
  }
  if (result.loading) {
    return <div>loading...</div>
  }
  console.log("result: ", result)
  const authors = result.data.allAuthors
  console.log('queryResult: ', authors)
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
              <td><button onClick={() => handleEdit(a.name)}>edit me</button></td>
            </tr>
          )}
        </tbody>
      </table>
      {name ? <EditAuthor name={name} handleSubmit={handleSubmit}/> : null}
    </div>
  )
}

export default Authors