const _ = require('lodash');
const mongoose = require('mongoose');
const {appDeviceAuth} = require('../middleWares/appDeviceAuth');
const Device = mongoose.model('devices');

module.exports = (app) => {

  app.post('/devices/register', appDeviceAuth, (req, res) => {
    var body = _.pick(req.body, ['uuid']);
    var newDevice = new Device(body);
    Device.find({
      uuid: body.uuid
    }).then((device) => {
      if (device) {
        return res.status(401).send({success: 0, dupe: 1});
      }

      newDevice.save().then(() => {
        res.send({success: 1, dupe: 0});
      }).catch((e) => {
        res.status(401).send({success: 0, dupe: 0});
      });
    });
  });

  app.patch('/devices/logLastUsed', appDeviceAuth, (req, res) => {
    var body = _.pick(req.body, ['uuid']);
    Device.find({
      uuid: body.uuid
    }).then((device) => {
      if (!device) {
        return res.status(400).send({
          message: "coudlnt' find device",
          success: 0,
          dupe: 0
        });
      }

      device.logLastUsed().then(() => {
        res.send({success: 1, dupe: 0})
      }, () => {
        res.status(401).send({succes: 0, dupe: 0});
      });
    });
  });

};
