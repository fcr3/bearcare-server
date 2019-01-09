const mongoose = require('mongoose');
const Providers = mongoose.model('providers');

module.exports = (app) => {
  // handles initial verification
  // user will see email sign up screen

  app.get('/api/providerMapData', (req, res) => {
    Providers.find({}, null, {limit: 5}, (err, providers) => {
      if (err) {
        res.status(401).send()
      } else {
        res.send({message: 'Sample Data', providers});
      }
    });
  });

}
