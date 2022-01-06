import React, { useState, useEffect } from 'react' 
import axios from 'axios' 
import Weather from './Weather'

const Country = ( {country} ) => {
    const [weather, setWeather] = useState([])
    const api_key = process.env.REACT_APP_API_KEY
    //const link = 'api.openweathermap.org/data/2.5/weather?q=' + country.capital + '&appid=' + api_key + 'units=metric'
    const link = 'http://api.openweathermap.org/data/2.5/weather?q=Helsinki&appid=ffae7d55b0be07a1c81f7262794253d9&units=metric'
    //console.log(link)
    const hook = () => {
    console.log('W_effect')
    axios
      .get(link)
      .then(response => {
        console.log('W_promise fulfilled')
        setWeather(response.data)
      })
    
    }
    useEffect(hook, [])
    console.log(weather)
    return (
    <div>
        <h1>{country.name.common}</h1>
        <p>capital: {country.capital}</p>
        <p>population: {country.population}</p>
        <h3>spoken languages</h3>
        <ul>
            {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
        </ul>
        {country.flag}
       
        
        
    </div>
  )
}

export default Country