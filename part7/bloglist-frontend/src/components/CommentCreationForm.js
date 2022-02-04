import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { addComment } from '../reducers/commentsReducers'

const CommentCreationForm = ({ blog_id }) => {
    const [comment, setComment] = useState('')
    const dispatch = useDispatch()
    const comments = useSelector(state => state.comments)

    const handleCreate = (event) => {
        event.preventDefault()
        console.log('COMMENT_CREATION_FORM: adding comment to blog ... ', comment)
        try {
            dispatch(addComment(comment, blog_id))
            console.log('COMMENT_CREATION_FORM: comment added')
            dispatch(setNotification(`You added a comment: ${comment}`))
        } catch(exception) {
            console.log('ERROR: COMMENT_CREATION_FORM: adding comment failed!')
            dispatch(setNotification(`ERROR: Adding comment "${comment}" failed`))
        }
        resetInputs()
        //console.log('COMMENT_CREATION_FORM: comments after: ', comments)
    }

    const resetInputs = () => {
        setComment('')
    }
    
    return (
        <div>
            <h3> Add a Comment </h3>
            <form onSubmit={handleCreate}>
                <div>
                    comment:
                    <input
                    id='comment'
                    type="text"
                    value={comment}
                    name="comment"
                    onChange={({ target }) => setComment(target.value)}
                    />
                </div>
                <button id='submit' type="submit"> add comment </button>
            </form>
        </div>
    )
}

export default CommentCreationForm