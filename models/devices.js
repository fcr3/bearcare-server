const mongoose = require('mongoose');
const _ = require('lodash');
const {Schema} = mongoose;

// Store data for push notifications

const deviceSchema = new Schema({
  uuid: {
    type: String,
    required: true,
    unique: true
  },
  lastUsed: {
    type: Number,
    default: null
  }
});

deviceSchema.methods.getJSON = function() {
  var device = this;
  var deviceObject = provider.toObject();
  return _.pick(deviceObject, ['uuid', 'lastUsed']);
}

deviceSchema.methods.logLastUsed = function() {
  var device = this;
  return device.updateOne({
    $set: {lastUsed: new Date()}
  });
}

deviceSchema.pre('save', function (next) {
  var user = this;
  user.lastUsed = new Date();
  next();
});

mongoose.model('devices', deviceSchema);
