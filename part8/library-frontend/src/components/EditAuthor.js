import React, { useState } from 'react'

const EditAuthor  = ({ name, handleSubmit }) => {
    const [born, setBorn] = useState('')
    const editAuthor = () => {
        handleSubmit(born)
    }
    
    return (
        <div>
            <h2>Edit Author {name}</h2>
            <form onSubmit={editAuthor}>
            <div>
                born in
                <input
                    type='number'
                    value={born}
                    onChange={({ target }) => setBorn(Number(target.value)) }
                />
                </div>
                <button type='submit'>update</button>
            </form>
        </div>
    )
}

export default EditAuthor