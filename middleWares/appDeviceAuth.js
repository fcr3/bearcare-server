const keys = require('../config/keys');

// app needs to put password in header for authentication to pass

var appDeviceAuth = (req, res, next) => {
  var devAuth = req.header('dev-auth');
  if (devAuth === keys.DEV_AUTH_PASSWORD) {
    next();
  } else {
    return Promise.reject();
  }
};

module.exports = {appDeviceAuth};
