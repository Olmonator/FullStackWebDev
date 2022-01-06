import React from 'react'

const Weather = (props) => {
    return (
    <div>
        <h3>weather in {props.capital}</h3>
        <p>temperature: {props.weather.main.temp}</p>
    </div>
  )
}

export default Weather