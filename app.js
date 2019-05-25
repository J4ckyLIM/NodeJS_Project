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

/*app.get('/', (request, response) =>{
    console.log(request.session)
    response.render('pages/index')
})

app.post('/', (request, response) =>{
    if(request.body.message === undefined || request.body.message === ''){
        request.flash('error', "Vous n'avez pas mis de message")
        response.redirect('/')
    } else {
        let User = require('./models/user.model')
    }
}) */

app.listen(config.port, ()=>{
    console.log('Express app listening')
})

module.exports = app
