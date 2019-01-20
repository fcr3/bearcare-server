const {OAuth2Client} = require('google-auth-library');
const keys = require('../config/keys');

// app needs to put token in header for authentication to pass

var appUserAuth = (req, res, next) => {
  const client = new OAuth2Client(keys.googleClientID);
  async function verify() {
    const ticket = await client.verifyIdToken({
      idToken: req.header('x-auth'),
      audience: keys.googleCliendID
    });
    const payload = ticket.getPayload();
    req.userID = payload['sub']; // grabs ID from verified account
    if (req.header('usr-auth') === keys.USR_AUTH_PASSWORD) {
      next();
    } else {
      return Promise.reject();
    }
  }
  verify().catch((e) => {
    res.status(401).send();
  });
};

module.exports = {appUserAuth};
