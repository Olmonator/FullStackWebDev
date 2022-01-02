const express = require('express')
const morgan = require('morgan')
const app = express()

app.use(express.json(), morgan('tiny'))

let persons = [
    { 
        "id": 1,
        "name": "Arto Hellas", 
        "number": "040-123456"
      },
      { 
        "id": 2,
        "name": "Ada Lovelace", 
        "number": "39-44-5323523"
      },
      { 
        "id": 3,
        "name": "Dan Abramov", 
        "number": "12-43-234345"
      },
      { 
        "id": 4,
        "name": "Mary Poppendieck", 
        "number": "39-23-6423122"
      }
]

app.get('/', (req, res) => {
    res.send('<h1>PhoneBook</h1>')
})

app.get('/api/info', (req, res) => {
    res.send(`Phonebook has info for ${persons.length} people <br/><br/>  ${Date()}`)
})
  
app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)
  
    if (person) {
      res.json(person)
    } else {
      res.status(404).end()
    }
  })

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)
  
    res.status(204).end()
})

const generateId = () => {
    return Math.floor(Math.random()*100000)
}
  
app.post('/api/persons', (req, res) => {
    const body = req.body
    console.log(body.name)
    if (!body) {
        return res.status(400).json({ 
          error: 'content missing' 
        })
      }
    if (persons.map(person => person.name).includes(body.name)) {
       
        return res.status(400).json({
            error: 'person already in phonebook'
        })
    }
    if (!body.name || !body.number) {
        return res.status(400).json({
            error: 'number or name missing'
        })
    }
    const person = {
        name: body.name,
        number: body.number,
        id: generateId(),
    }

    persons = persons.concat(person)

    res.json(person)
})
  
const PORT = 3001
app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`)
})