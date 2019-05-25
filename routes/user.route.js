let express = require('express')
let router = express.Router();
let User = require('../models/user.model')

router.post('/register', (request, response) =>{
    let user = new User({
        name: request.body.name,
        email: request.body.email,
        password: request.body.password
    })

    User.addUser(user, (err, result)=>{
        if(err){
            return response.json({success: false, message: err})
        }

        return response.json({success: true, message: SpeechRecognitionResultList})
    })
})

router.post('/login', (request, response)=>{
    User.login(request.body.email, request.body.password, (err, result)=> {
        if(err){
            return response.json({success: false, message: err})
        }
        return response.json({success: true, message: result})
    })
})

module.exports = router