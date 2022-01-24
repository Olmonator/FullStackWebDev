require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')
const Person = require('./models/person')
const opts = { runValidators: true }
 

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 
  if (error.name === 'ValidationError') {
    return response.status(400).send({ error: 'Input was incorect'})
  }

  next(error)
}

app.use(
  express.json(),
  morgan('tiny'), 
  cors(),
  express.static('build'),
  errorHandler
)

app.get('/', (req, res) => {
  res.send('<h1>PhoneBook</h1>')
})


app.get('/api/info', (req, res) => {
  Person.find({}).then(persons => {
    res.send(`Phonebook has info for ${persons.length} people <br/><br/>  ${Date()}`)
  })  
})

// Database fetching
app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id).then(person => {
    if (person) {
      res.json(person)
    } else {
      res.status(404).end()
    }
  })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(result => {
      res.status(204).end()
      console.log(result)
    })
    .catch(error => next(error))
})

const generateId = () => {
  return Math.floor(Math.random()*100000)
}
  
app.post('/api/persons', (req, res) => {
  const body = req.body
  console.log(body)
  if (!body) {
    return res.status(400).json({ 
      error: 'content missi ng' 
    })
  }  
  const person = new Person ({
    id: generateId(),   
    name: body.name,
    number: body.number,   
  })
  person.save().then(savedPerson => {
    res.json(savedPerson)
  })
    .catch(function(err) {
      if (err.name == 'ValidationError') {
        console.error('Error Validating!', err)
        res.status(422).json(err)
      } else {
        console.error(err)
        res.status(500).json(err)
      }
    })
})

app.put('/api/persons/:id', (request, response, next, opts) => {
  const body = request.body

  const person = {
    number: body.number,
  }

  console.log(person)

  Person.findByIdAndUpdate(request.params.id, person, { new: true }, opts)
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})
  
const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})