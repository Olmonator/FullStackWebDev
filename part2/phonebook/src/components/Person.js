import React from 'react'

const Person = ({ key, person }) => {
  return (
    <li>{person.name}</li>
  )
}

export default Person