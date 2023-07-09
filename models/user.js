const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
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
        }
    },
    {
        timestamps: true //adds 'createdAt' & 'updatedAt' fields in docs
    }
)

const User = mongoose.model('User', userSchema); 

module.exports = User;