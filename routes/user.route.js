const express = require('express');
const router = express.Router();
const Post = require('../models/blogPost')

// middleware that is specific to this router

router.use(function random(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});
// define the user home page route
router.get('/', function(req, res) {
  res.render('../views/users/index')
});

// define the CRUD route
router.get('/create', function(req, res) {
  res.render('../views/users/create')
});

router.get('/read/:id', function(req,res){
  res.render('../views/users/read')
})

router.get('/update/:id', function(req, res) {
  res.render('../views/users/update')
});

router.get('/delete/:id', function(req, res) {
  res.send('Delete a post');
});


// POST route to save our "post" in our blog

router.post('/create', (req,res,next)=>{
  if(req.body.title && req.body.content){
    var postData = {
      title: req.body.title,
      content: req.body.content
    }
    Post.create(postData, (error, post)=>{
        if(error){
          return next(error)
        }else {
            res.redirect('/user')
          }
        })
      }
    })


module.exports = router