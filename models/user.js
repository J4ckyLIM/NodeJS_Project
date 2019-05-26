const mongoose = require('mongoose')
const bcryptjs =  require('bcryptjs')

// Bcrypt variables for password hash

const salt = bcryptjs.genSaltSync(10)
const hash = bcryptjs.hashSync("B4c0/\/", salt)

// Our schema for user

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        match: /^[a-zA-Z ]+$/
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    },
    password:{
        type: String,
        required: true
    }
})

var User = mongoose.model('User', userSchema);

// saving our new user 

userSchema.pre('save', function(next){
    var user = this
    bcryptjs.hash(user.password, salt, (err, hash)=>{
        if(err){
            return next(err)
        }
        user.password = hash
        next()
    })
})

module.exports = User;
