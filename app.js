 const PORT = 5000;
 const express = require('express');
 const jwt = require('jsonwebtoken');
 const app = express();

 const users = require('./api/routes/users');

app.use((req, res, next) => {
  res.status(200).json({
    message: 'API works correctly'
  });
})

app.use('/users', userRoutes);

 app.get('/api', (req, res) => {
    res.json({ 
        message: 'Welcome to the API'
    });
 });

 app.post('/api/users', (req, res) => {
    //fake user
    const user = {
        id: 1,
        username: 'User',
        password: 'ada@asdasw!2',
        email: "user@email.com",
    }
    jwt.sign({user}, 'secretkey', (err, token) => {
        res.json({
            token
        })
    });
 })

 app.post('/', (req, res) => {
    const { parcel } = req.body;
    if(!parcel){
        return res.status(400).send({status: 'failed'})
    }
        return res.status(200).send({status: 'success'})
 })




//Token verification
function verifyToken(req, res, next){
    const bearerHeader = req.headers['authorization'];
    //undef case
    if(typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    }
    else{
        res.sendStatus(403);
    }
}

 app.listen(PORT, () => console.log('API is running on 5000'));
 module.exports = app;
