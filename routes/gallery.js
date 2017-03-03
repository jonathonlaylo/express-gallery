/*jshint esversion: 6 */
const server = require('../server');
const express = require('express');
const models = require('../models');

const app = express();
const router = express.Router();

router.route('/')
  .get((req, res) => {
    // console.log('username', req.user.username);

    models.Gallery.findAll()
      .then((gallery) => {
        let username;
        if (req.user) {
          username = req.user.username;
        } else {
          username = null;
        }
        res.render('gallery/index', {
          'gallery': gallery,
          username: username
        });
      });
  })
  .post(isAuthenticated, (req, res) => {
    models.Gallery.create({
      author: req.body.author,
      link: req.body.link,
      description: req.body.description
      })
    .then((task) =>{
      res.redirect(303, '/gallery');
    });
  });

router.route('/new')
  .get(isAuthenticated, (req, res) =>{
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
    models.Gallery.findOne({
      where: {
        id: req.params.id
      }
    })
    .then((galleryPhoto) =>{
      models.Gallery.findAll({
        where : {
          id : {
            $ne : req.params.id
          }
        }
      })
      .then((galleryPhotos) =>{
        res.render('gallery/photo', {
          'galleryPhoto': galleryPhoto,
          'galleryPhotos': galleryPhotos
        });
      });
      // res.render('gallery/photo', {'galleryPhoto': galleryPhoto});
    });
  })
  .put((req, res) => {
    console.log(req.body);
    models.Gallery.findById(req.params.id)
    .then((task) => {
      if(task){
        console.log('task', task);
        task.update({
          author: req.body.author,
          link: req.body.link,
          description: req.body.description
        }).then((task) =>{
          res.redirect(303, '/gallery');
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
      res.redirect(303, '/gallery');
    });
  });

function isAuthenticated(req, res, next){
  console.log('ping');
  if(req.isAuthenticated()){
    next();
  } else {
    console.log('Sorry');
    res.redirect('/login');
  }
}

module.exports = router;