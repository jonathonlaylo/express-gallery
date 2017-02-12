/*jshint esversion: 6 */
const server = require('../server');
const express = require('express');
const gallery = require('../models/Gallery.js');

const app = express();
const router = express.Router();

module.exports = router;