const express = require('express');
const router = express.Router();
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const userRouter = require('./user.route')
const app = express()

app.use('/user', userRouter)


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
  res.render('../views/users/signin');
});

// POST route to save our new user

router.post('/signup', (req,res,next)=>{
  if(req.body.name && req.body.email && req.body.password){
    var userData = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    }
    bcrypt.genSalt(10, (err,salt)=>{
      bcrypt.hash(userData.password, salt, (err,hash)=>{
        if(err) throw err
        userData.password = hash
        User.create(userData, (error, user)=>{
          if(error){
            return next(error)
          }else {
            res.redirect('/signin')
          }
        })
      })
    })
  }
})

// POST route connect our new user

router.post('/signin', (req,res,next)=>{
  if(req.body.email && req.body.password){
    var logData = {
      email: req.body.email,
      password: req.body.password
    }
    User.findOne({'email': logData.email}).then(users =>{
      console.log(users)
      if(!users){
        return res.status(404).json({ email: 'User not found' })
      }
      // Compare password , if match => user is connected
      bcrypt.compare(req.body.password, users.password).then(isMatch =>{
        if(isMatch){
          res.redirect('/user')
          console.log('Successfully connected')
        }
      })
    })
  }
})

module.exports = router;
