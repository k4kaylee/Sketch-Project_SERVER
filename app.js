const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/user');
const app = express();
const port = 3000;


// Start the server
app.use(express.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
})


mongoose.connect('mongodb+srv://ZulKinar:681ae85y@skecthapi.oaokxjn.mongodb.net/?retryWrites=true&w=majority')
        .then(() => {
            console.log("Connected successfully!");
            app.listen(port, () => {
              console.log(`Server is running on port ${port}`);
            });
          }
        )
        .catch((error) => console.error(error));


app.get('/users', async(req, res) => {
    // res.json(users);
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
  console.log(name);
  console.log(password);

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
    const user = await User.create(req.body);
    res.status(200).json(user);
  } catch (error) {
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
});

// User login endpoint
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Find the user in the database
  const user = users.find(user => user.email === email);

  // Check if the user exists and the password is correct
  if (!user || user.password !== password) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  // Return a success message
  res.json({ message: 'Login successful', user });
});*/