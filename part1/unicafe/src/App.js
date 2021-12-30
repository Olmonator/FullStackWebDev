import React, { useState } from 'react'

const Header = (props) => {
  return (
    <div>
      <h1>{props.name}</h1>
    </div>
  )
}

const Stat = (props) => {
  return (
    <tbody>
      <tr>
        <th>{props.name}</th>
        <th>{props.counter}</th>
      </tr>
    </tbody>
  )
}

const Statistics = (props) => {
  const good = props.good
  const neutral = props.neutral
  const bad = props.bad
  const all = good + neutral + bad
  if (all === 0) {
    return (
      <div>
        no feedback given
      </div>
    ) 
  }  
  return (
    <div>
      <table>
        <Stat name="Good" counter={good}/>
        <Stat name="Neutral" counter={neutral}/>
        <Stat name="Bad" counter={bad}/>
        <Stat name="All" counter={all}/>
        <Stat name="Average" counter={(good - bad) / all}/>
        <Stat name="Positive" counter={good / all + " %"}/>
      </table>
    </div>
  )
} 

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>{props.name}</button>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => setGood(good + 1)
  const handleNeutral = () => setNeutral(neutral + 1)
  const handleBad = () => setBad(bad + 1)

  return (
    <div>
      <Header name={"give review"}/>
      <Button name="good" handleClick={handleGood}/>
      <Button name="neutral" handleClick={handleNeutral}/>
      <Button name="bad" handleClick={handleBad}/>
      <Header name={"statistics"}/>
      <Statistics good={good} bad={bad} neutral={neutral}/> 
    </div>
  )
}

export default App