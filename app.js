const express = require('express')
const bodyParser = require ('body-parser')
const mongoose = require('mongoose')
const config = require('./config')
const userRouter = require('./routes/router')
const app = express()
// Connection to MongoDB

const db = mongoose.connection

mongoose.connect(config.dbUrl, {useNewUrlParser: true})
mongoose.set('useCreateIndex', true)

db.on('open', ()=>{
    console.log("Connected to MongoDB")
})

db.on('error', err => {
    console.log('Erreur de connection' + err)
})

// Templating
app.set('view engine', 'ejs')

// Middleware

app.use('/assets', express.static('public'))
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())
app.use('/user', userRouter)

// Routes

app.get('/user', (req, res )=>{
    res.render('index.ejs')
})

app.post('/user/signup', (req,res)=>{
    res.render('signup.ejs')
})

app.post('/user/signin', (req,res)=>{
    res.render('signin.ejs')
}) 




app.listen(config.port, ()=>{
    console.log('Express app listening')
})

module.exports = app
