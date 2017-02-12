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
        // res.json('sanity check');
        res.json(gallery);
      });
  })

  .post((req, res) => {
    models.Gallery.create({
      author: req.body.author,
      link: req.body.link,
      description: req.body.description
      })
    .then((task) =>{
      res.json(task);
    });
  });

router.route('/:id')
  .get((req, res) =>{
    models.Gallery.findById(req.params.id)
    .then((gallery) =>{
      res.json(gallery);
    });
  });

module.exports = router;