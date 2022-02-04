import { useSelector } from "react-redux"

const CommentList = ({ blog_id }) => {
    const comments = useSelector(state => state.comments)
    const blogComments = comments.filter(comment => comment.blog_id === blog_id)[0]

    if (!blogComments) {
        return (
            <div>
                <p> Looks like this blog has no comments yet, you can be the first!</p>
            </div>
        )
    } else {
        console.log('COMMENT_LIST: comments for this blog: ', blogComments.contents)
        return (
            <div>
                <ul>
                    {blogComments.contents.map(comment =>
                        <li key={comment.id}>{comment.text}</li>
                    )}
                </ul>
            </div>
        )
    }
}

export default CommentList