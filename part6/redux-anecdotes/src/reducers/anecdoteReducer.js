import anecdoteService from "../services/anecdoteService"

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
      const changedAnecdote = action.data
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : changedAnecdote 
      )
    default: 
      return state
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'CREATE',
      data: newAnecdote
    })
  }
}

export const vote = (anecdoteToChange) => {  
  const changedAnecdote = {
    ...anecdoteToChange, 
    votes: anecdoteToChange.votes +1
  }
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.update(changedAnecdote)
    dispatch({
      type: 'VOTE',
      data: updatedAnecdote 
    })
  }
}

export const initAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT',
      data: anecdotes
    })
  }
}

export default anecdoteReducer