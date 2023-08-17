const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/user');
const dblink = require('./.txt')
const app = express();
const port = 5000;
const jwt = require('jsonwebtoken');
require('dotenv').config();
const fsPromises = require('fs').promises;
const path = require('path');
const Chat = require('./models/chat')
const { v4: uuidv4 } = require('uuid');

// Start the server
app.use(express.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
})


mongoose.connect(dblink)
        .then(() => {
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

app.post('/chats', chatController.createChat);
app.get('/chats/:id', chatController.getChatsByUserId);
app.put('/chats/:id/messages', chatController.addMessage);
