/*jshint esversion: 6 */
const express = require('express');
const bp = require('body-parser');
const app = express();
const handlebars = require('express-handlebars');

const hbs = handlebars.create({
  extname: '.hbs',
  defaultlayout: 'app'
});

app.engine('hbs', hbs.engine);

app.set('view engine', 'hbs');

app.use(bp.urlencoded({extended: true}));

const db = require('./models');
const gallery = require('./routes/gallery.js');
const user = require('./routes/user.js');
const {User, Gallery} = db;

app.use('/gallery', gallery);

app.use('/user', user);

app.listen(3000, function(){
  console.log('Server started on port 3000');
  db.sequelize.sync();
});

module.exports = app;