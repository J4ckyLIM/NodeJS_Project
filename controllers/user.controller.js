const JWT = require('jsonwebtoken')
const User = require('../models/user.model')
const { JWT_SECRET } = require('../configuration/config')

signToken = user=>{
    return JWT.sign({
        iss: 'Miam',
        sub: user._id,
        iat: new Date().getTime(), // Current time
        exp: new Date().setDate(new Date().getDate() + 1)
    }, JWT_SECRET)
}
module.exports = {
    signUp: async(request, response, next)=>{
        const { name, email, password} = request.value.body

        // Check if user email is unique 
        const checkUser = await User.findOne({ email })
        if(checkUser){ 
            return response.status(400).send({error: "Email is already used"})
        }
        const newUser = new User({ name , email, password })
        await newUser.save();
        
        // Generate a JWT token
        const token = signToken(newUser)
        
        // Response with a JWT token
        response.status(200).json({ token })
    },
    signIn: async(request, response, next)=>{
        console.log('UserController.signin() called')
    },
    secret: async(request, response, next)=>{
        console.log('UserController.secret() called')
    }
}