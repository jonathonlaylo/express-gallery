/*jshint esversion: 6 */
const server = require('../server');
const express = require('express');
const user = require('../models/User.js');

const app = express();
const router = express.Router();

module.exports = router;