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
        res.render('gallery/index', {'gallery': gallery});
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

router.route('/new')
  .get((req, res) =>{
    models.Gallery.findAll()
      .then((gallery) => {
        res.render('gallery/new');
      });
  });

router.route('/:id/edit')
  .get((req, res) => {
    models.Gallery.findById(req.params.id)
    .then((gallery) => {
      res.render('gallery/edit', {'galleryEdit': gallery});
    });
  });

router.route('/:id')
  .get((req, res) =>{
    models.Gallery.findById(req.params.id)
    .then((gallery) =>{
      res.json(gallery);
    });
  })
  .put((req, res) => {
    models.Gallery.findById(req.params.id)
    .then((task) => {
      if(task){
        task.updateAttributes({
          author: req.body.author,
          link: req.body.link,
          description: req.body.description
        }).then((task) =>{
          res.json(task);
        });
      }
    });
  })
  .delete((req, res) => {
    models.Gallery.destroy({
      where: {
        id: req.params.id
      }
    }).then((task) =>{
      res.json(task);
    });
  });

module.exports = router;