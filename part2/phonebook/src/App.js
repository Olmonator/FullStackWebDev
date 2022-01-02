import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import Form from './components/Form'
import personService from './services/persons'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
     }, [])

  const addPerson = (event) => {
    event.preventDefault()
    
    const nameObject = {
      name: newName,
      number: newNumber,
      id: persons.length +1
    }
    if (persons.map(person => person.name).includes(newName)) {
      const temp_id = persons.find(person => person.name === newName).id
      console.log('ID:', temp_id)
      console.log('updating person', event.target)
      nameObject.id = temp_id
      personService
        .update(temp_id, nameObject)
        .then(returnedPerson => {
          setPersons(persons.filter(person => person.id !== temp_id).concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
    } else {
      console.log('adding new person:', event.target)
      personService
        .create(nameObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
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

  const deletePerson = (id) => {
    personService.deletePerson(id)
    setPersons(persons.filter(person => person.id !== id))
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
        deletePerson={deletePerson}
       />
    </div>
    
  )
}

export default App