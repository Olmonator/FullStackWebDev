const blogsRouter = require('express').Router()
const Blog = require('../model/blog')
const logger = require('../utils/logger')

blogsRouter.get('/', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
      logger.info("GET request successful")
    })
})

blogsRouter.post('/', (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
      logger.info("POST request successful")
    })
})

module.exports = blogsRouter