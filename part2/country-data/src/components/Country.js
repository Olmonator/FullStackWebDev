import React from 'react'


const Country = ( {country} ) => {
    
    return (
    <div>
        <h1>{country.name.common}</h1>
        <p>capital: {country.capital}</p>
        <p>population: {country.population}</p>
        <h3>spoken languages</h3>
        <ul>
            {Object.values(country.languages).map(language => <li>{language}</li>)}
        </ul>
        {country.flag}
        <h3>weather in {country.capital}:</h3>
    </div>
  )
}

export default Country