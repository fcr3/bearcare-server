const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');

require('./models/providerMapData');
require('./models/refCollection');

mongoose.connect(keys.MONGODB_URI, {useNewUrlParser: true});
const app = express();
app.use(bodyParser.json());

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
// require('./routes/providerRoutes')(app); DEPRECATED
require('./routes/providerRoutes2')(app);
// require('./routes/rcRoutes')(app);

/*

Again for authentication, this time routes:
require('./routes/authRoutes')(app);

*/

app.listen(PORT, () => {
  if (process.env.NODE_ENV !== 'production') {
      console.log("listening on port 3000");
  }
})
