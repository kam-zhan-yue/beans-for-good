require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
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
  res.send('Welcome to the Backend!');
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
  const { username, password } = req.body;
  const userExists = await User.findOne({ username });

  if (userExists) {
    return res.status(400).send('User already exists');
  }

  const user = new User({ username, password });
  await user.save();
  res.status(201).send({ id: user._id, username: user.username }); // Exclude password from response
}));


app.post('/login', asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  // Find the user by their name 
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(404).send('User not found');
  }

  if (isMatch) {
    // Login successful
    res.send('Login successful');
  } else {
    // Passwords do not match
    res.status(401).send('Invalid credentials');
  }
}));


app.get('/inventory/:username', asyncHandler(async (req, res) => {
  const { username } = req.params;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).send('User not found');
    }

    const transformedItems = user.items.map(item => ({
      id: item.id,
      quantity: item.quantity
    }));

    res.status(200).json({ items: transformedItems });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching user inventory');
  }
}));


app.get('/store/:name', async (req, res) => {
  const { name } = req.params;

  try {

    const store = await Store.findOne({ name });
    if (!store) {
      return res.status(404).json({ message: 'Store not found' });
    }

    const itemsWithParsedPrice = store.items.map(item => ({
      id: item.id,
      price: item.price.$numberInt ? parseInt(item.price.$numberInt, 10) : item.price
    }));

    res.json({ items: itemsWithParsedPrice });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching store items' });
  }
});

async function replaceUserItems(username, newItems) {
  try {
    console.log(newItems);
    const updatedUser = await User.findOneAndUpdate(
      { "username": username },
      { $set: { "items": newItems } }, // replace the entire items array
    );

    if (updatedUser) {
      console.log('Items list updated successfully:', updatedUser);
    } else {
      console.log('User not found');
    }
  } catch (error) {
    console.error('Error updating items list:', error);
  }
}

app.post('/inventory/:username/purchase', asyncHandler(async (req, res) => {
  const username = req.params.username;
  const newItems = req.body;
  console.log(username);
  console.log(newItems);

  try {
    await replaceUserItems(username, newItems);
    res.status(200).send('Items purchased successfully');
  } catch (error) {
    console.error('Error during purchase:', error);
    res.status(500).json({ message: error.message });
  }
}));