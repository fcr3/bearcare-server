const passport = require('passport');

module.exports = (app) => {
  // handles initial verification
  // user will see email sign up screen
  app.get('/auth/google', passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  // handles callback address and asks passport to handle approval
  app.get('/auth/google/callback', passport.authenticate('google', {
    successRedirect: '/user/current',
    failureRedicrect: '/user/logout'
  }));

  app.get('/user/logout', (req, res) => {
    req.logout();
    res.send({
      message: 'logged out',
      user: req.user
    });
  });

  app.get('/user/current', (req, res) => {
    res.send({
      message: 'current user',
      user: req.user || null
    });
  });
}
