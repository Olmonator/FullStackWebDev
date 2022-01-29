const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch(action.type) {
    case 'INIT':
      return action.data
    case 'CREATE':
      return [... state, action.data]
    case 'VOTE':
      const id = action.data.id
      const anecdoteToChange = state.find(n => n.id === id)
      const changedAnecdote = {
        ...anecdoteToChange, 
        votes: anecdoteToChange.votes +1
      }
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : changedAnecdote 
      )
    default: 
      return state
  }
}

export const createAnecdote = (anecdote) => {
  return {
    type: 'CREATE',
    data: anecdote
  }
}

export const vote = (id) => {  
  return {
    type: 'VOTE',
    data: { id }
  }
}

export const initAnecdotes = (anecdotes) => {
  return {
    type: 'INIT',
    data: anecdotes
  }
}

export default anecdoteReducer