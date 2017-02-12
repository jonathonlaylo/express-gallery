/*jshint esversion: 6 */
const server = require('../server');
const express = require('express');
const models = require('../models');

const app = express();
const router = express.Router();

router.route('/')
  .get((req, res) => {
    models.Gallery.findAll()
      .then((gallery) => {
        // res.send('sanity check');
        res.json(gallery);
      });
  });

module.exports = router;