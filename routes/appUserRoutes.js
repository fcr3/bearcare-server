const _ = require('lodash');
const mongoose = require('mongoose');
const {appUserAuth} = require('../middleWares/appUserAuth');
const Users = mongoose.model('users');

/*
Note:
Users must send email and uuid within body, along with parameters needed
to pass authentication. See middleWares/appUserAuth.js for details.
*/


module.exports = (app) => {

  app.post('/appUser/register', appUserAuth, (req, res) => {
    if (!req.userID) {
      res.status(401).send({
        message: "No userID given for registration",
        success: 0,
        dupe: 0
      })
    }

    var body = _.pick(req.body, ['email']);
    body = {...body, googleId: req.userID, insurances: []};
    var newUser  = new Device(body);

    Users.findByCredentials(body.email, body.googleId).then((user) => {
      if (user) {
        return res.status(401).send({success: 0, dupe: 1});
      }

      newUser.save().then(() => {
        res.send({success: 1, duplicate: 1});
      }).catch((e) => {
        res.status(401).send({success: 0, dupe: 0});
      });
    });
  });

  app.post('/appUser/login', appUserAuth, (req, res) => {
    var body = _.pick(req.body, ['email']);
    Users.findByCredentials(body.email, req.userID).then((user) => {
      res.send({
        message: "login successful",
        user
      });
    }).catch((e) => {
      res.status(400).send();
    });
  });

  app.patch('/appUser/addInsurance', appUserAuth, (req, res) => {
    var body = _.pick(req.body, ['email', 'insurances']);
    Users.findByCredentials(body.email, req.userID).then((user1) => {
      user1.addInsurance(body.insurances).then(() => {
        User.findOne({email: body.email}).then((user2) => {
          res.send({
            message: "added insurances",
            user2
          });
        });
      });
    }).catch((e) => {
      res.status(400).send();
    });
  });

  app.delete('/appUser/deleteInsurance', appUserAuth, (req, res) => {
    var body = _.pick(req.body, ['email', 'insToDelete']);
    Users.findByCredentials(body.email, req.userID).then((user1) => {
      user1.deleteInsurance(body.insToDelete).then(() => {
        User.findOne({email: body.email}).then((user2) => {
          res.send({
            message: "deleted insurances",
            user2
          });
        })
      });
    });
  });

};
