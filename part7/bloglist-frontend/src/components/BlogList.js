import React from 'react'
import Blog from './Blog'
import BlogCreationForm from './BlogCreationForm'
import Menu from './Menu'

import { Table } from 'react-bootstrap'

const BlogList = ({ blogs, user }) => {

  return (
    <div>
        <Menu user={user}/>
        <h2> Blogs </h2>
        <BlogCreationForm />
        <Table striped hover>
          <tbody>
            {blogs.sort((blog1, blog2) => blog2.likes - blog1.likes).map(blog =>
              <Blog
                key={blog.id}
                blog={blog}
                user={user}
              />
            )}
          </tbody>
        </Table>
    </div>
  )
}

export default BlogList