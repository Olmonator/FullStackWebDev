import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Persons from './components/Persons'
import Filter from './components/Filter'
import Form from './components/Form'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const hook = () => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }
  
  useEffect(hook, [])

  const addPerson = (event) => {
    console.log(event.target)
    event.preventDefault()
    
    const nameObject = {
      name: newName,
      number: newNumber,
      id: persons.length +1
    }
    if (persons.map(person => person.name).includes(newName)) {
      window.alert(`${newName} is already added to phonebook`)
    } else {
      console.log('add new person:', nameObject.name, nameObject.number)
      setPersons(persons.concat(nameObject))
      setNewName('')
      setNewNumber('')
    }
  }

  const filteredPersons = 
    (filter === '') ?
    persons :
    persons.filter(person => person.name.toLowerCase().includes(filter) === true) 

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }

  return (
    <div>
      <h1>Phonebook</h1>
      filter with: <Filter
        value={filter}
        onChange={handleFilterChange}
      />

      <h3>Add to Phonebook</h3>
      <Form 
        onSubmit={addPerson} 
        nameValue={newName} 
        nameChange={handleNameChange} 
        numberValue={newNumber} 
        numberChange={handleNumberChange}
      />

      <h3>Numbers</h3>
      <Persons 
        persons={persons} 
        filterFunction={filteredPersons}
       />
    </div>
    
  )
}

export default App