import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Countries from './components/Countries'


const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  const hook = () => {
    console.log('effect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }
  
  useEffect(hook, [])
  console.log(countries)
  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }

  const selectedCountries = filter === '' ?
    countries :
    countries.filter(country => country.name.common.toLowerCase().includes(filter))
  
  console.log('selected', selectedCountries)
  return (
    <div>
      <h1>Country Data</h1>
      find countries: <Filter
        value={filter}
        onChange={handleFilterChange}
      />    
      <Countries selectedCountries={selectedCountries} />
    </div>
  )
}

export default App 