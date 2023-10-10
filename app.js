const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const dblink = process.env.MONGO_DBLINK;
const app = express();
const port = process.env.port || 5000;
const jwt = require('jsonwebtoken'); /* Not added yet */
require('dotenv').config();
const cors = require('cors'); 
const io = require('./sockets/socket.js')

app.use(cors());

// Start the server 
app.use(express.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
})


const connectDB = async () => {
  try {
    const conn = await mongoose.connect(dblink);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

connectDB().then(() => {
  console.log("Connected successfully!");
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}
)
  .catch((error) => console.error(error));



const userController = require('./controllers/userController');

app.get('/users', userController.getUserList);
app.get('/users/:id', userController.getUserById);
app.get('/login', userController.loginUser);
app.post('/users', userController.registerUser);
app.delete('/users', userController.deleteUser);



const chatController = require('./controllers/chatController');

app.put('/chats/user/:userId', chatController.createChat);
app.get('/chats/:chatId', chatController.getChatById);
app.get('/chats/user/:id', chatController.getChatsByUserId);
app.put('/chats/:id/messages', chatController.addMessage);
app.delete('/chats/:chatId/messages/:messageId', chatController.removeMessage);
