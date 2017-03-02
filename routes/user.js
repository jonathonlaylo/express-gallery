/*jshint esversion: 6 */
const server = require('../server');
const express = require('express');
const user = require('../models/User.js');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const db = require('../models');
const {User} = db;


const app = express();
const router = express.Router();

router.route('/')
  .get((req, res) =>{
    res.render('./signup');
  });
// .post('/user/new', (req, res) =>{
router.post('/',(req, res) =>{

  bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(req.body.password, salt, function(err, hash) {
      console.log('hash', hash);
      User.create({
        username: req.body.username,
        password: hash
      }).then( _ => {
          res.redirect('/login');
          // res.redirect('/gallery');
      });
    });
  });
});

module.exports = router;