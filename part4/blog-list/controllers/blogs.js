const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const logger = require('../utils/logger')
const User = require('../models/user')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', {username: 1,  name: 1})
  response.json(blogs.map(blog => blog.toJSON()))
  logger.info("GET request successful")
})

blogsRouter.post('/', middleware.tokenExtractor, async (request, response) => {
  const body = request.body

  const user = await User.findById(request.token.id)
  
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user
  })
  const savedBlog = await blog.save()
  response.json(savedBlog)

  user.blogs = user.blogs.concat(savedBlog)
  await user.save()

  logger.info("POST request successful")
})

blogsRouter.delete('/:id', middleware.tokenExtractor, async (request, response, next) => {
  const token = request.token.id
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)
  const blog = await Blog.findById(request.params.id)
  if(!blog) {
    logger.error("Blog Entry Not available")
    return response.status(404).end()
  }
  console.log("IDs: ", user.id.toString(), blog.user.toString())
  if (user.id.toString() !== blog.user.toString()) {
    logger.error("Only the User who posted the Blog can delete it")
    return response.status(400).end()
  }
  await blog.delete()
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body
  const blog = {
    title: body.title,
    url: body.url,
    likes: body.likes,
  }

  await Blog.findByIdAndUpdate(request.params.id, blog)
  response.json(blog)
  logger.info("PUT request successful")
})

module.exports = blogsRouter