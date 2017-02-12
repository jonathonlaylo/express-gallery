/*jshint esversion: 6 */
const express = require('express');
const bp = require('body-parser');
const app = express();

app.use(bp.urlencoded({extended: true}));

const db = require('./models');
const {User, Gallery} = db;



app.listen(3000, function(){
  console.log('Server started on port 3000');
  db.sequelize.sync();
});