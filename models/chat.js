const mongoose = require('mongoose');
const Message = require('./message');
const { v4: uuidv4 } = require('uuid');

const chatSchema = mongoose.Schema(
    {
        id: {
            type: String,
            default: uuidv4,
            required: [true, 'ID is obligatory'],
            unique: true,
        },
        avatar: {
            // Define the avatar field as needed
        },
        participants: [
            {
                id: {
                    type: String,

                },
                name: {
                    type: String,
                },
            },
        ],
        nameVocabulary: [{
            id: {
                type: String
            },
            name: {
                type: String
            },
        }],
        messages: [
            Message.schema
        ],
    },
    {
        timestamps: true
    }
)

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;