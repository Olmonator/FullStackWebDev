const mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator'); 

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'USERNAME is required'],
    minlength: [3, 'USERNAME must be at least 3 letters long'],
    unique:  [true, 'USERNAME must be unique']
  },
  name: {
    type: String,
  },
  passwordHash: String,
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog'
    }
  ],
})


userSchema.plugin(uniqueValidator)


userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User