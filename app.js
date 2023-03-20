const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const PORT = 5500;

const userRoutes = require('./routes/users');

app.use('/users', userRoutes);

app.use((req, res, next) => {
  res.status(200).json({
    message: 'API works correctly'
  });
})

 app.listen(PORT, () => console.log('API is running on ' + PORT));
 module.exports = app;
 