import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state)
    const dispatch = useDispatch()
    
    const handleVote = (id) => {
        console.log('vote', id)
        dispatch(vote(id))
        console.log('voted')
    }

    return (
        anecdotes
            .sort((a, b) => {
                return b.votes - a.votes
            })
            .map(anecdote =>
                <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => handleVote(anecdote.id)}>vote</button>
                </div>
                </div>
        )
    ) 
}

export default AnecdoteList