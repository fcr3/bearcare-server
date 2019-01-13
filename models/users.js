const mongoose = require('mongoose');
// const validator = require('validator');
const {Schema} = mongoose;

const userSchema = new Schema({
  googleId: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
    unique: true
  },
  insurances: [String]
});

mongoose.model('users', userSchema);
