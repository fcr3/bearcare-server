const mongoose = require('mongoose');
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

mongoose.model('providers', providerMapDataSchema, 'providerMapData');
