const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/user');
require('dotenv').config();
const dblink = process.env.MONGO_DBLINK;
const app = express();
const port = process.env.port || 5000;
const jwt = require('jsonwebtoken'); /* Not added yet */
require('dotenv').config();
const WSServer = require('express-ws')(app);


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


  app.ws('/', (ws, req) => {
    ws.send('You are connected succesfully');
    ws.on('message', (msg) => {
      const message = JSON.parse(msg);
      console.log(message.userId);
      switch (message.method) {
          case "connection": 
              connectionHandler(message.userId, message.status)
          break;
      }
    })
  })

  connectionHandler = async (userId, status) => {
    console.log("ConnectionHandler");
      try {
        const user = await User.findOne({ id: userId });

        if (user) {
          user.status = status;
    
          await user.save();
        } else
          throw ("User not found!")
      } catch (error) {
        console.error("Error:", error);
      }
    }