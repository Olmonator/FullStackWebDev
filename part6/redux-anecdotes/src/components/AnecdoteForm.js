import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
    const handleCreate = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        console.log('create Anecdote', content)
        props.createAnecdote(content)
        
        event.target.anecdote.value = ''

        props.setNotification('New Anecdote: ' + content + ' created!', 5)
    }
    
    return (
        <form onSubmit={handleCreate}>
            <input name='anecdote'/>
            <button type='submit'>create</button>
        </form>
    )
}

const mapDispatchToProps = {
    createAnecdote,
    setNotification,
}

const ConnectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm)
export default ConnectedAnecdoteForm