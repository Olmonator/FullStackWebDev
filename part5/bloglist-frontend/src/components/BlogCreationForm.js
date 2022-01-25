import React, {useState, useImperativeHandle} from 'react'

const BlogCreationForm =  React.forwardRef(({createBlog}, ref) => {
  
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')
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
})

export default BlogCreationForm