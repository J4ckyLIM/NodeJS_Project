const mongoose = require('mongoose')


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


module.exports = User;
