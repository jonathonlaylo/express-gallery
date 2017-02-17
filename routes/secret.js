/*jshint esversion: 6 */
const server = require('../server');
const express = require('express');
const handlebars = require('express-handlebars');

const passport = require('passport');

const router = express.Router();
const app = express();

router.route('/')
  .get(isAuthenticated, (req, res) => {
  res.send('this is my secret page');
});

function isAuthenticated (req, res, next) {
  if (req.isAuthenticated()) {
    next();
  }else {
    console.log('NOPE');
    res.redirect('/login');
  }
}

module.exports = router;