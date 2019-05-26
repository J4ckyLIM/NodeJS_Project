const express = require('express');
const router = express.Router();
const User = require('../models/user')


// middleware that is specific to this router

router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});
// GET routes
router.get('/', (req, res)=> {
  res.send('blabla');
});

router.get('/signup', (req, res)=> {
  res.render('../views/users/signup')
});

router.get('/signin',(req, res)=> {
  res.send('SignIn Page');
});

// POST routes

router.post('/signup', (req,res,next)=>{
  if(req.body.name && req.body.email && req.body.password){
    var userData = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    }
    User.create(userData, (error, user)=>{
      if(error){
        return next(error)
      }else {
        res.redirect('/signin')
      }
    })
  }
})

module.exports = router;
