import React from 'react'
import Person from './Person'

const Filter = ( {persons, filterFunction, deletePerson}) => {
  return (
    <ul>
        {filterFunction.map(person =>
            <Person key={person.id} id={person.id} name={person.name} number={person.number} deletePerson={deletePerson}/>
        )}
    </ul>
  )
}

export default Filter