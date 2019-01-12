const mongoose = require('mongoose');
const {Schema} = mongoose;

const rcSchema = new Schema({
  _id: {
    "$oid": {
      type: String
    },
  },
  ins: {
    type: String
  },
  name: {
    type: String
  },
  vals: {
    type: [{type: String}]
  }
});

mongoose.model('refCollection', rcSchema, 'refCollection');
