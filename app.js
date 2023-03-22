const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const bodyParser = require('body-parser')
const PORT = 5500;

const userRoutes = require('./routes/users');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/users', userRoutes);
    
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
       error:{
        message: error.message
       }
     })
    }
);

 app.listen(PORT, () => console.log('API is running on ' + PORT));
 module.exports = app;
 