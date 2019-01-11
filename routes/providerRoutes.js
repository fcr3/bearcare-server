const mongoose = require('mongoose');
const _ = require('lodash');
const Providers = mongoose.model('providers');
const {ObjectID} = require('mongodb');

module.exports = (app) => {
  // handles initial verification
  // user will see email sign up screen

  app.get('/api', (req, res) => {
    res.send({
      message: "Welcome to the BearCare API"
    });
  });

  app.get('/api/providerMapData/sample', (req, res) => {
    Providers.find({}, null, {limit: 5}, (err, providers) => {
      if (err) {
        res.status(401).send()
      } else {
        res.send({message: 'Sample Data', providers});
      }
    });
  });

  // Query Routing Based On:

  const query = '/api/providerMapData/:f_name&:l_name&:addr&:spec&:ins';
  function checkParams(params) {
    var queryObj = {
      provider_first_name: params.f_name,
      provider_last_name: params.l_name,
      addr: params.addr,
      specialty: params.spec,
      insurances: params.ins
    }

    var retObj = _.pickBy(queryObj, (val) => val !== '\'\'');
    retObj = _.mapValues(retObj, (val) => {return {$in: [val]};});
    return retObj;
  }

  app.get(query, (req, res) => {
    Providers.find(checkParams(req.params)).then((providers) => {
      if (!providers) {return res.status(404).send();}
      res.send({providers});
    }).catch((e) => {
      res.status(400).send();
    });
  });
}
