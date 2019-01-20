const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
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
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    }
  },
  insurances: [String]
});

userSchema.statics.findByCredentials = function (email, googleId) {
  var User = this;
  return User.findOne({email}).then((user) => {
    if (!user) {
      return Promise.reject();
    }
    return new Promise((resolve, reject) => {
      bcrypt.compare(googleId, user.googleId, (err, res) => {
        if (res) {
          resolve(user);
        } else {
          reject();
        }
      })
    });
  });
};

userSchema.methods.getJSON = function() {
  var user = this;
  var userObject = user.toObject();
  return _.pick(userObject, ['email', 'insurances', 'devices']);
}

userSchema.methods.addInsurance = function(insurances) {
  var user = this;
  user.insurances.forEach((val) => {
    if (val === insurances) {
      return new Promise((res, rej) => {
          res({user});
      });
    }
  });

  return user.updateOne({
    $pop: {
      insurances: -1
    },
    $addToSet: {
      insurances: {
        $each: insurances.split(',')
      }
    }
  });
}

userSchema.methods.deleteInsurance = function(insurances) {
  var user = this;
  return user.updateOne({
    $pullAll: {
      insurances: insurances.split(',')
    }
  });
}

userSchema.pre('save', function (next) {
  var user = this;
  if (user.isModified('googleId')) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.googleId, salt, (err, hash) => {
        user.googleId = hash;
        next();
      });
    });
  } else {
    next();
  }
});

mongoose.model('users', userSchema);
