/*jshint esversion: 6 */
const express = require('express');
const bp = require('body-parser');
const app = express();
const handlebars = require('express-handlebars');
const methodOverride = require('method-override');
const hbs = handlebars.create({
  extname: '.hbs',
  defaultLayout: 'app'
});

const session = require('express-session');
const RedisStore = require('connect-redis')(session);

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const db = require('./models');
const gallery = require('./routes/gallery.js');
const user = require('./routes/user.js');
const login = require('./routes/login.js');
const secret = require('./routes/secret.js');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const {User, Gallery} = db;

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.use(bp.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use(express.static('public'));

app.use(session({
  store: new RedisStore(),
  resave: false,
  secret: 'something-keyboard-cat',
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/gallery', gallery);
app.use('/user', user);
app.use('/login', login);
app.use('/secret', secret);

passport.use(new LocalStrategy(
  function(username, password, done){
    User.findOne({
      where: {
        username: username
      }
    }).then(user => {
      console.log(user);
      if(user === null){
        console.log('User Failed');
        return done(null, false, {message: 'Bad username'});
      } else {
        bcrypt.compare(password, user.password).then(res => {
          if (res) {
            return done(null, user);
          } else {
            return done(null, false, {message: 'Bad password'});
          }
        });
      }
    }).catch(err => {
      console.log('error: ', err);
    });
  }
));

passport.serializeUser(function(user, done) {
  return done(null, {
    id: user.id,
    username: user.username
  });
});

passport.deserializeUser(function(user, done) {
  User.findOne({
    where: {
      id: user.id
    }
  }).then(user => {
    return done(null, user);
  });
});


app.post('/new', (req, res) => {
  bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(req.body.password, salt, function(err, hash) {
      User.create({
        username: req.body.username,
        password: hash
      }).then( _ => {
        res.redirect('/login');
      });
    });
  });
});


app.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/gallery');
});

app.listen(3000, function(){
  console.log('Server started on port 3000');
  db.sequelize.sync();
});

module.exports = app;
