import React from 'react'
import Person from './Person'

const Filter = ( {persons, filterFunction}) => {
  return (
    <ul>
        {filterFunction.map(person =>
            <Person key={person.id} name={person.name} number={person.number}/>
        )}
    </ul>
  )
}

export default Filter