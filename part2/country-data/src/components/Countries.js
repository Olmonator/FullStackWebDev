import React from 'react'
import Country from './Country'

const Countries = ( {selectedCountries} ) => {
    if (selectedCountries.length > 10) {
        return (
            <div>
                Too many results, adjust query ...
            </div>
        )
    } else if (selectedCountries.length === 1) {
        return (
            <Country country={selectedCountries[0]}/>
        )
    }
    return (
        <div>
            <h3> countries </h3>
            <ul>
                {selectedCountries.map(country => <li key={country.cca2}> {country.name.common} </li>)}
            </ul>
        </div>
    )
}

export default Countries