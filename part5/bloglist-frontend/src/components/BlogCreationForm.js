import React, {useState} from 'react'

const BlogCreationForm = ({ handleCreate }) => {
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')

  return (
    <form onSubmit={handleCreate}>
        <div> 
        title:
            <input 
            type="text"
            value={blogTitle}
            name="Blogtitle"
            onChange={({ target }) => setBlogTitle(target.value)}
            />
        </div>
        <div>
        author:
            <input 
            type="text"
            value={blogAuthor}
            name="Blogauthor"
            onChange={({ target }) => setBlogAuthor(target.value)}
            />
        </div>
        <div>
        url:
            <input 
            type="text"
            value={blogUrl}
            name="BlogURL"
            onChange={({ target }) => setBlogUrl(target.value)}
            />
        </div>
        <button type="submit"> create </button>
    </form>
  )
}

export default BlogCreationForm