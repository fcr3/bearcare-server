const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');

mongoose.connect(keys.MONGOD_URI, {useNewUrlParser: true});
const app = express();
/*

For Authentication use later:
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

*/

const PORT = process.env.PORT || 3000;
require('./routes/providerRoutes')(app);

/*

Again for authentication, this time routes:
require('./routes/authRoutes')(app);

*/

app.listen(PORT, () => {
  if (process.env.NODE_ENV === 'development') {
      console.log("listening on port 5000");
  }
})
