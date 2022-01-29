import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const handleCreate = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        console.log('create Anecdote', content)
        dispatch(createAnecdote(content))
        
        event.target.anecdote.value = ''

        dispatch(setNotification('New Anecdote: ' + content + ' created!', 5))
    }
    
    return (
        <form onSubmit={handleCreate}>
            <input name='anecdote'/>
            <button type='submit'>create</button>
        </form>
    )
}

export default AnecdoteForm