import React, { useState, useImperativeHandle } from 'react'

const BlogCreationForm =  React.forwardRef(({ createBlog }, ref) => {

  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')
  BlogCreationForm.displayName = 'BlogCreationForm'

  const handleCreate = (event) => {
    event.preventDefault()

    console.log('creating new blogpost ...', event.target)
    const newBlogObject = {
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl,
      likes: 0
    }
    createBlog(newBlogObject)
  }

  const resetInputs = () => {
    setBlogAuthor('')
    setBlogTitle('')
    setBlogUrl('')
  }

  useImperativeHandle(ref, () => {
    return {
      resetInputs
    }
  })

  return (
    <div className='blogCreationDiv'>
      <h2>Create a new Blog</h2>
      <form onSubmit={handleCreate}>
        <div>
          title:
          <input
            id='blogTitle'
            type="text"
            value={blogTitle}
            name="Blogtitle"
            onChange={({ target }) => setBlogTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            id='blogAuthor'
            type="text"
            value={blogAuthor}
            name="Blogauthor"
            onChange={({ target }) => setBlogAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            id='blogUrl'
            type="text"
            value={blogUrl}
            name="BlogURL"
            onChange={({ target }) => setBlogUrl(target.value)}
          />
        </div>
        <button type="submit"> create </button>
      </form>
    </div>
  )
})

export default BlogCreationForm