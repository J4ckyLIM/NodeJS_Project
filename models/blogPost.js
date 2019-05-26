const mongoose = require('mongoose')

const blogPostSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        unique: true
    },
    content:{
        type: String,
        required: true,
    }
})


var BlogPost = mongoose.model('BlogPost', blogPostSchema);
module.exports = BlogPost;