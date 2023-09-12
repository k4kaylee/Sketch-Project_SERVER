const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const messageSchema = new mongoose.Schema({
    id: {
      type: String,
      default: uuidv4,
      required: [true, 'ID is obligatory'],
      unique: true,
      sparse: true
    },
    author: String,
    content: String,
    time: String
  });


const Message = mongoose.model('Message', messageSchema);

module.exports = Message;