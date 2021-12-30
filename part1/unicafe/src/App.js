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
    <div>
      <p>
        {props.name}: {props.counter}
      </p>
    </div>
  )
}

const Button = (props) => { 
  <button onClick={props.handleClick}>
    {props.text}
  </button>
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
      <button onClick={handleGood}>good</button>
      <button onClick={handleNeutral}>neutral</button>
      <button onClick={handleBad}>bad</button>
      <Header name={"statistics"}/>
      <Stat name={"Good"} counter={good}/>
      <Stat name={"Neutral"} counter={neutral}/>
      <Stat name={"Bad"} counter={bad}/>
      <Stat name={"All"} counter={bad + good + neutral}/>
      <Stat name={"Average"} counter={(good - bad) / (bad + good + neutral)}/>
      <Stat name={"Positive"} counter={good / (good + bad + neutral) + " %"}/>
    </div>
  )
}

export default App