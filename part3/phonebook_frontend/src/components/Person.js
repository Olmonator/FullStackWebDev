import React from 'react'

const Person = (props) => {
  return (
    <li>
      {props.name}: {props.number}
      <button onClick={() => props.deletePerson(props.id)}>delete</button>
    </li>
    
  )
}

export default Person