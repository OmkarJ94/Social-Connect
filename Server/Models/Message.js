const mongoose = require('mongoose')

const MessageSchema = mongoose.Schema({
    senderid: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    roomid: {
        type: String,
        required: true
    },
    recieverid: {
        type: String,
        required: true
    },
    reciever_username: {
        type: String,
        required: true
    },
    sender_username: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

const MessageModel = mongoose.model('Message', MessageSchema)
module.exports = MessageModel 