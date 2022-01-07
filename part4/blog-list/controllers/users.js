const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const logger = require('../utils/logger')

usersRouter.post('/', async (request, response) => {
  const body = request.body

  if (!body.password) {
    console.log("POST request failed, no passwore")
    response.status(400).end()
  }
  if (body.password.length < 3) {
    console.log("POST request failed: Password too short")
    response.status(400).end()
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.json(savedUser)
  logger.info("POST request successful")
  console.log("TEST_USER: POST", savedUser)
})

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({}).populate('blogs', {title: 1, author: 1})
  logger.info("GET request successful")
  console.log(users)
  response.json(users.map(u => u.toJSON()))
})

module.exports = usersRouter