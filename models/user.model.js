const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

// User Schema

const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
        validate: /[a-z]/
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password:{
        type: String,
        required: true
    }
})


// User model

const User = mongoose.model('users', userSchema);


// Saving the user in our Database
/*
User.addUser = function (user, callback){
    bcrypt.genSalt(10, (err, salt) =>{
        if(err){
            callback('server error')
        }else {
            bcrypt.hash(user.password, salt, (err,salt) =>{
                if(err){
                    callback('server error')
                }else {
                    user.password = hash
                    user.save((err, result)=>{
                        if(err){
                            console.log(err)
                            callback("Vous n'avez pas pu être ajouté", null)
                        } else {
                            callback(null, 'User added')
                        }
                    })
                }
            })
        }
    })
}


// Login

User.login = function(email, password, callback){
    User.findOne({email: email}, (err, user)=>{
        if(err){
            console.log(err)
            callback('Server error')
        } else if(user == undefined){
            callback('user not found')
        } else {
            bcrypt.compare(password, user.password, (err, isMatch) =>{
                if(err){
                    callback('server error')
                }else if(isMatch=== true){
                    callback(null,'login successfully')
                }else {
                    callback('login info incorrect')
                }
            })
        }
    })
}
*/
module.exports = User