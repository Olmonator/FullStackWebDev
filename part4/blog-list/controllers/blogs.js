const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const logger = require('../utils/logger')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', {username: 1,  name: 1})
  response.json(blogs.map(blog => blog.toJSON()))
  logger.info("GET request successful")
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body

  const user = await User.find({})
  console.log("NEW USER: ", user)
  const blog = new Blog({
    title: body.title,
    author: body.title,
    url: body.url,
    likes: body.likes,
    user: user[0]
  })
  const savedBlog = await blog.save()
  response.json(savedBlog)
  logger.info("POST request successful")
})

blogsRouter.delete('/:id', async (request, response, next) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body
  const blog = {
    title: body.title,
    url: body.url,
    liles: body.likes,
  }

  await Blog.findByIdAndUpdate(request.params.id, blog)
  response.json(blog)
  logger.info("PUT request successful")
})

module.exports = blogsRouter