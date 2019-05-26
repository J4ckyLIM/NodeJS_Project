var express = require('express');
var router = express.Router();

// middleware that is specific to this router

router.use(function addUser(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});
// define the home page route
router.get('/', function(req, res) {
  res.send('blabla');
});

// define the signup route
router.get('/signup', function(req, res) {
  res.render('../views/users/signup')
});
// define the signin route
router.get('/signin', function(req, res) {
  res.send('SignIn Page');
});

module.exports = router;
