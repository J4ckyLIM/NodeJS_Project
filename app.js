const express = require('express')
const bodyParser = require ('body-parser')
const mongoose = require('mongoose')
const config = require('./config')

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
//app.use('/users', userRoute)
app.use(session({
    secret: 'random',
    resave: false,
    saveUninitialized: true,
    cookie: {secure: false}
}))
app.use(require('./middlewares/flash'))

// Routes

app.use('/users', require('./routes/user.route'));


app.listen(config.port, ()=>{
    console.log('Express app listening')
})

module.exports = app
