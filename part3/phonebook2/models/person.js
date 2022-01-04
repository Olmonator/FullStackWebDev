const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const url = process.env.MONGODB_URI

console.log('connecting to', url)
mongoose.connect(url)
  .then(result => {    
    console.log('connected to MongoDB', result)  
  })  
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'a name is required'], 
    minlength: [3, 'a name must be at least 3 chars long '],
    unique: [true, 'an entry with the same name already exists'], 
    uniqueCaseInsensitive: true },
  number: { 
    type: String,
    minlength: [8, 'a number must be at least 8 digits long'],
    required: true },
})

personSchema.plugin(uniqueValidator)

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)