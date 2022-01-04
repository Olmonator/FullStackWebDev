const blogsRouter = require('express').Router()
const Blog = require('../model/blog')
const logger = require('../utils/logger')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
  logger.info("GET request successful")
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)

  const savedBlog = await blog.save()
  response.json(result)
  logger.info("POST request successful")
})

module.exports = blogsRouter