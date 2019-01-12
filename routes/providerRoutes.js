/*

DEPRECATED!

These routes are unreliable and admittedly have bugs in them. Do not expect
reliability.

These routes take advantage of a set of data that takes less space, but use
more complex accessing methods to get meaningful data.

*/


const mongoose = require('mongoose');
const _ = require('lodash');
const Providers = mongoose.model('providers');
const RefCollection = mongoose.model('refCollection');
const {ObjectID} = require('mongodb');

module.exports = (app) => {

  app.get('/api', (req, res) => {
    res.send({message: "Welcome to the BearCare API"});
  });

  app.get('/api/pmd/sample', (req, res) => {
    Providers.find({}, null, {limit: 5}, (err, providers) => {
      if (err) {res.status(401).send()}
      else {res.send({message: 'Sample Data', providers});}
    });
  });

  // Query Routing:

  const query = '/api/pmd/?f_name=:f_name&l_name=:l_name&addr=:addr&spec=:spec&ins=:ins';
  function capitalize(string) {
    if (string === '\'\'') {return string;}
    var retArr = string.toLowerCase().split(',');
    retArr = retArr.map((val) => {
      var interArr = val.split(" ");
      interArr = interArr.map((inVal) => {
        return inVal.charAt(0).toUpperCase() + inVal.slice(1);
      });
      return interArr.join(" ").trim();
    });
    return retArr;
  }

  function lowerCase(string) {
    var retArr = string.toLowerCase().split(',');
    retArr = retArr.map((val) => {return val.toLowerCase()});
    return retArr;
  }

  function categoryExtraction(key, items) {
    var retDict = {};
    items.forEach((item) => {
      if (item.toJSON().cat === key) {
        item.vals.forEach((val) => {retDict[val] = val;});
      }
    });
    var retArr = Object.keys(retDict);
    if (retArr.length === 0) {return '\'\'';}
    return retArr;
  }

  app.get(query, (req, res) => {
    RefCollection.find({
      name: {
        $in: capitalize(req.params.spec).concat(lowerCase(req.params.ins))
      }
    }).then((vals) => {
      var queryObj = {
        provider_first_name: capitalize(req.params.f_name),
        provider_last_name: capitalize(req.params.l_name),
        addr: req.params.addr.toUpperCase(),
        specialty: categoryExtraction('spec', vals),
        insurances: categoryExtraction('ins', vals)
      };

      queryObj = _.pickBy(queryObj, (val) => val !== '\'\'' || !val);
      queryObj = _.mapValues(queryObj, (vals) => {
        if ((typeof vals) === 'string') {return {$in: vals.split(',')};}
        return {$in: vals};
      });
      // console.log(queryObj);

      Providers.find(queryObj).then((providers) => {
        if (!providers) {return res.status(404).send();}
        res.send({count: providers.length, providers});
      }).catch((e) => {
        // console.log(e);
        res.status(400).send();
      });
    }).catch((e) => {
      // console.log(e);
      res.status(404).send()
    });
  });
}
