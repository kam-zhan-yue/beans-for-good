require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const asyncHandler = require('express-async-handler');
const User = require('./models/User'); // Make sure this path is correct


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

// User registration route with bcrypt for password hashing
app.post('/users', asyncHandler(async (req, res) => {
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