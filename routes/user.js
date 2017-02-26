/*jshint esversion: 6 */
const server = require('../server');
const express = require('express');
const user = require('../models/User.js');

const app = express();
const router = express.Router();

// const session = require('express-session');
// const RedisStore = require('connect-redis')(session);
// const LocalStrategy = require('passport-local').Strategy;
// const passport = require('passport');
// const bcrypt = require('bcrypt');
// const saltRounds = 10;



// passport.use(new LocalStrategy (
//   function(username, password, done){
//     User.findOne({
//       where: {
//         username: username
//       }
//     }).then (user => {
//       if(user === null) {
//         console.log('user failed');
//         return done(null, false, {message: 'bad username'});
//       } else {
//         bcrypt.compare(password, user.password).then(res => {
//           if (res) {
//             return done(null, user);
//           } else {
//             return done(null, false, {message: 'bad password'});
//           }
//         });
//       }
//     }).catch(err => {
//       console.log('error: ', err);
//     });
//   }
// )


app.post('/user/new', (req, res) =>{
  // req.body.username;
  // req.body.password;

  bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(req.body.password, salt, function(err, hash) {
      console.log('hash', hash);
      User.create({
        username: req.body.username,
        password: hash
      }).then( _ => {
          res.redirect('/login');
      });
    });
  });
});


module.exports = router;

// function checkPassword(plainTextPassword){
//   return bcrypt.compare(plainTextPassword, passwordInDB, function(err, res) {
//     console.log(res);
//     return res;
//   });
// }