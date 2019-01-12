const mongoose = require('mongoose');
const _ = require('lodash');
const Providers = mongoose.model('providers');
const {ObjectID} = require('mongodb');

module.exports = (app) => {
  const basePath = '/api/pmd2';

  app.get('/api', (req, res) => {
    res.send({message: "Welcome to the BearCare API"});
  });

  app.get(basePath + '/sample', (req, res) => {
    Providers.find({}, null, {limit: 5}, (err, providers) => {
      if (err) {res.status(401).send()}
      else {res.send({message: 'Sample Data', providers});}
    });
  });

  // General Querying:
  const f_n = '/f_name=:provider_first_name';
  const l_n = '&l_name=:provider_last_name';
  const addr = '&addr=:addr';
  const spec = '&spec=:specialty';
  const ins = '&ins=:insurances';

  function splitAndCap(string) {
    if (string === '\'\'') {return string;}
    var retArr = string.split(',');
    retArr = retArr.map((val) => {
      if (val.toUpperCase() === 'SHIP') {return val.toUpperCase();}
      var interArr = val.split(" ");
      interArr = interArr.map((inVal) => {
        return inVal.charAt(0).toUpperCase() + inVal.slice(1).toLowerCase();
      });
      return interArr.join(" ").trim();
    });
    return retArr;
  }

  app.get(basePath + f_n + l_n + addr + spec + ins, (req, res) => {
    var paramsObj = _.pickBy(req.params, (val) => val !== '\'\'' || !val);
    paramsObj = _.mapValues(paramsObj, (val, key) => {
      if (key === 'addr') {return {$in: [val.toUpperCase()]};}
      return {$in: splitAndCap(val)};
    });
    Providers.find(paramsObj).then((providers) => {
      if (!providers) {res.status(400).send();}
      res.send({count: providers.length, params: paramsObj, providers});
    }).catch((e) => res.status(404).send());
  });

};
