const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');

require('./models/providerMapData');
require('./models/refCollection');
require('./models/users');
require('./services/passport');

mongoose.connect(keys.MONGODB_URI, {useNewUrlParser: true});
const app = express();
app.use(bodyParser.json());

/*
For Authentication use:
*/
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

require('./routes/mainRoutes')(app);
require('./routes/authRoutes')(app);
// require('./routes/providerRoutes')(app); DEPRECATED
require('./routes/providerRoutes2')(app);
// require('./routes/rcRoutes')(app);

app.listen(keys.PORT, () => {
  if (process.env.NODE_ENV !== 'production') {
      console.log(`listening on port ${keys.PORT}`);
  }
})
