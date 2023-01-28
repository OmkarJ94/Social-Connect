const mongoose = require('mongoose')

const User = mongoose.Schema({
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
    password: {
        type: String,

    },
    profilepic: {
        type: String,
        default: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
        // required: true
    },
    posts: {
        type: Array,
        default: []
    },
    
    followers: {
        type: Array,
        default: []
    },
    following: {
        type: Array,
        default: []
    },
    description: {
        type: String,
        default: ''
    },
    allmessages: {
        type: Array,
        default: []
    }
})

const UserModel = mongoose.model('user', User)
module.exports = UserModel