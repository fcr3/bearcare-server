const mongoose = require('mongoose');
const _ = require('lodash');
const {Schema} = mongoose;

const providerMapDataSchema = new Schema({
  _id: {
    "$oid": {
      type: String
    },
  },
  provider_last_name: {
    type: String
  },
  provider_first_name: {
    type: String
  },
  specialty: {
    type: String
  },
  insurances: {
    type: String
  },
  addr: {
    type: String
  },
  phone: {
    type: String
  }
});

providerMapDataSchema.methods.toJSON = function() {
  var provider = this;
  var providerObject = provider.toObject();
  return _.pick(providerObject, ['_id', 'provider_last_name',
        'provider_first_name', 'specialty', 'insurances',
        'addr', 'phone']);
}

// mongoose.model('providers', providerMapDataSchema, 'providerMapData');
mongoose.model('providers', providerMapDataSchema, 'provideMapData2');
