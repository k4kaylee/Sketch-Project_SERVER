const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/user');
const dblink = require('./.txt')
const app = express();
const port = 5000;


// Start the server
app.use(express.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
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


app.get('/users', async(req, res) => {
    try{
      const users = await User.find({});
      res.status(200).json(users);
    } catch (error){
      res.status(500).json({message: error.message})
    }
})

app.get('/users/:id', async(req,res) =>{
  try{
    const id = req.params.id;
    const user = await User.findById(id);
    res.status(200).json(user);
  }catch(error){
    res.status(500).json({message: error.message})
  }
})

app.get('/login', async(req, res) => {
  const {name, password} = req.query;

  try{
    const user = await User.findOne({name: name, password: password});
    if(!user){
      res.status(404).json({message: 'The user was not found.'})
    } else {
      res.status(200).json(user);
    }
  }catch(error){
    console.log(error.message)
  }
})

app.post('/users', async(req, res) => {
  try{

    const { name, password, email } = req.body;

    // Check if the required fields are provided  
    if (!name || !password || !email) {
      return res.status(400).json({ error: 'Please provide all the required fields' });
    }
    
    // Check if the email is already taken
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(401).json({ error: 'Email is already registered' });
    }
    
    const user = await User.create(req.body);
    res.status(200).json(user);


  } catch (error) {
    console.log(error.message);
    res.status(500).json({message: error.message})
  }
})


// User registration endpoint
/*app.post('/register', (req, res) => {
  const { name, lastName, email, password } = req.body;

  // Check if the required fields are provided  
  if (!name || !lastName || !email || !password) {
    return res.status(400).json({ error: 'Please provide all the required fields' });
  }

  // Check if the email is already taken
  if (users.some(user => user.email === email)) {
    return res.status(400).json({ error: 'Email is already registered' });
  }

  // Create a new user object
  const newUser = { name, lastName, email, password };

  // Add the new user to the database
  users.push(newUser);

  // Return the newly created user
  res.status(201).json({ message: 'User registered successfully', user: newUser });
});*/