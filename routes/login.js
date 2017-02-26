/*jshint esversion: 6 */
const server = require('../server');
const express = require('express');
const handlebars = require('express-handlebars');

const passport = require('passport');

const router = express.Router();
const app = express();

router.route('/')
  .get( (req, res) => {
  res.render('./login');
});

router.post('/', (passport.authenticate('local', {
  successRedirect: '/gallery',
  failureRedirect: '/login'
})));

module.exports = router;