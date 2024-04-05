require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const asyncHandler = require('express-async-handler');
const User = require('./models/User'); 
const Store = require('./models/Store');



const app = express();
const cors = require('cors');

const PORT = process.env.PORT || 3000;

app.use(express.json()); // Middleware to parse JSON bodies
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Connected to MongoDB and server is running on port ${PORT}`);
    })
  })
  .catch((error) => {
    console.log(error)
  })

  // Root route
app.get('/', (req, res) => {
  res.send('Welcome to the API');
});

app.get('/stores', async (req, res) => {
  try {
    const stores = await Store.find({});
    res.json(stores);
  } catch (err) {
    res.status(500).send('Error fetching stores from the database');
  }
});

// User registration route with bcrypt for password hashing
app.post('/signup', asyncHandler(async (req, res) => {
  const { name, password } = req.body;
  const userExists = await User.findOne({ name });
 
  if (userExists) {
    return res.status(400).send('User already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10); // Hash password with bcrypt
  const user = new User({ name, password: hashedPassword });
  await user.save();
  res.status(201).send({ id: user._id, name: user.name }); // Exclude password from response
}));


app.get('/login', asyncHandler(async (req, res) => {
  const { name, password } = req.body;

  // Find the user by their name 
  const user = await User.findOne({ name });
  if (!user) {
    return res.status(404).send('User not found');
  }

  // Compare the provided password with the stored hashed password
  const isMatch = await bcrypt.compare(password, user.password);
  if (isMatch) {
    // Login successful
    res.send('Login successful');
  } else {
    // Passwords do not match
    res.status(401).send('Invalid credentials');
  }
}));