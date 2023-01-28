const mongoose = require('mongoose')

const Post = mongoose.Schema({
    username: {
        type: String,
        unique: true,
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        // required: [true, "email required."],
        required: true
    },
    profilepic: {
        type: String,
        default: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
        // required: true
    },
    url: {
        type: String,
        required: true
    },
    caption: {
        type: String,
        default: ''
    },
    likes: {
        type: Array,
        default: []
    },
    comments:
    {
        type: Array,
        default: []
    }
})

const PostModel = mongoose.model('post', Post)
module.exports = PostModel