/*jshint esversion: 6 */
const server = require('../server');
const express = require('express');
const user = require('../models/User.js');

const app = express();
const router = express.Router();

app.post('/user/new', (req, res) =>{

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