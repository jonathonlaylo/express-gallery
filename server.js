/*jshint esversion: 6 */
const express = require('express');
const bp = require('body-parser');
const app = express();
const handlebars = require('express-handlebars');
const methodOverride = require('method-override');

const hbs = handlebars.create({
  extname: '.hbs',
  defaultlayout: 'app'
});

app.engine('hbs', hbs.engine);

app.set('view engine', 'hbs');

app.use(bp.urlencoded({extended: true}));

app.use(methodOverride('_method'));

//new stuff
const CONFIG = require('./config/config.json');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

app.use(session({
  secret: CONFIG.SESSION_SECRET
}));

app.use(passport.initialize());
app.use(passport.session());

//new stuff
const authenticate = (username, password) => {
  // get user data from the DB
  const { USERNAME } = CONFIG;
  const { PASSWORD } = CONFIG;

  // check if the user is authenticated or not
  return ( username === USERNAME && password === PASSWORD );
};

passport.use(new LocalStrategy(
  function (username, password, done) {
    console.log('username, password: ', username, password);
    // check if the user is authenticated or not
    if( authenticate(username, password) ) {

      // User data from the DB
      const user = {
        name: 'Joe',
        role: 'admin',
        favColor: 'green',
        isAdmin: true,
      };

      return done(null, user); // no error, and data = user
    }
    return done(null, false); // error and authenticted = false
  }
));

passport.serializeUser(function(user, done) {
  return done(null, user);
});

passport.deserializeUser(function(user, done) {
  return done(null, user);
});

const db = require('./models');
const gallery = require('./routes/gallery.js');
const user = require('./routes/user.js');
const login = require('./routes/login.js');
const secret = require('./routes/secret.js');

const {User, Gallery} = db;

app.use('/gallery', gallery);

app.use('/user', user);

app.use('/login', login);

app.use('/login', (passport.authenticate('local', {
  successRedirect: '/secret',
  failureRedirect: '/login'
})));

app.use('/secret', secret);

app.listen(3000, function(){
  console.log('Server started on port 3000');
  db.sequelize.sync();
});

module.exports = app;