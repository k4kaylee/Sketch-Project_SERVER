const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const Chat = require('./chat')

const userSchema = mongoose.Schema(
    {
        id: {
            type: String,
            default: uuidv4,
            unique: true,
            required: true
        },
        avatar: {

        }, 
        name: {
            type: String,
            required: [true, "User must have a name"]
        },
        password: {
            type: String,
            required: [true, "User must have a valid password"]
        },
        email: {
            type: String,
            required: [true, "User must have a valid email"]
        },
        chats: {
            type: [ Chat.Schema ],
            default: [ ],
        }
    },
    {
        timestamps: true //adds 'createdAt' & 'updatedAt' fields in docs
    }
)

const User = mongoose.model('User', userSchema); 

module.exports = User;