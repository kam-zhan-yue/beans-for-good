require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const asyncHandler = require('express-async-handler');
const User = require('./models/User'); // Make sure this path is correct

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json()); // Middleware to parse JSON bodies

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://toby_guan:ilovebeans@codebrew-2024.gexpvgd.mongodb.net/?retryWrites=true&w=majority&appName=codebrew-2024";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
// Home route
app.get('/', (req, res) => {
  res.send('Hello World!');
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

// Server start
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});