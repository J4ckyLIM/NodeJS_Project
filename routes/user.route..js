var express = require('express');
var router = express.Router();

// middleware that is specific to this router

router.use(function random(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});
// define the user home page route
router.get('/', function(req, res) {
  res.send('User home page');
});

// define the CRUD route
router.get('/create', function(req, res) {
  res.send('Create a new post')
});

router.get('/read/:id', function(req,res){
  res.send('Read a post')
})

router.get('/update/:id', function(req, res) {
  res.send('Update a post');
});

router.get('/delete/:id', function(req, res) {
  res.send('Delete a post');
});




module.exports = router;