import React, { useState } from 'react'

function findMax(array) {
  var maxIndex = 0
  var max = 0
  for (var i = 0; i < array.length; i++) {
    if (array[i] > max) {
        maxIndex = i
        max = array[i]
    }
  }
  return maxIndex
}

const High = (props) => {
  const index = findMax(props.points)
  return (
    <div>
      <h1>Most popular anecdote!</h1>
      {props.anecdotes[index]}
      has {props.points[index]} votes
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
    // weird issue when the same random number appears twice, quick fix added
  const nextRand = () => {
    var rand = 0
    do {
      rand = (Math.floor(Math.random() * anecdotes.length))
    } while (rand === selected)
    console.log(rand)
    return rand
  }
  
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Uint8Array(10))
  const random = nextRand()
  const handleNext = () => setSelected(random)
  


  const handleVote = () => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
  }

  return (
    <div>
      <h1>anecdote of the day</h1>
      <p>
       {anecdotes[selected]}
      </p>
      <p>
        has {points[selected]} votes
      </p>
      <button onClick={handleNext}>next anecdote</button>
      <button onClick={handleVote}>vote</button>
      {console.log(points)}
      <High anecdotes={anecdotes} points={points}/>
    </div>
  )
}

export default App