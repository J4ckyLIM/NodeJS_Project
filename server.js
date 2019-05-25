let express = require('express')
let app = express()
let bodyParser = require ('body-parser')
let session = require('express-session')
let mongoose = require('mongoose')
let config = require('./config')
let userRoute = require('./routes/user.route')

// Connection to MongoDB

let db = mongoose.connection
mongoose.connect(config.dbUrl, {useNewUrlParser: true})
mongoose.set('useCreateIndex', true)

db.on('open', ()=>{
    console.log("Mongoose default connection is open")
})

db.on('error', err => {
    console.log('Erreur de connection' + err)
})

// Moteur de template
app.set('view engine', 'ejs')

// Middleware
app.use('/assets', express.static('public'))
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())
app.use('/users', userRoute)
app.use(session({
    secret: 'random',
    resave: false,
    saveUninitialized: true,
    cookie: {secure: false}
}))
app.use(require('./middlewares/flash'))

// Routes

app.get('/', (request, response) =>{
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
})

app.listen(config.port, ()=>{
    console.log('Express app listening')
})

