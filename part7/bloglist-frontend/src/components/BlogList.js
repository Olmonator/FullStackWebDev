import React from 'react'
import Blog from './Blog'
import BlogCreationForm from './BlogCreationForm'

const BlogList = ({ blogs, user }) => {

  return (
    <div>
        <h2> Blogs </h2>
        <BlogCreationForm />

        {blogs.sort((blog1, blog2) => blog2.likes - blog1.likes).map(blog =>
            <Blog
            key={blog.id}
            blog={blog}
            user={user}
            />
        )}
    </div>
  )
}

export default BlogList