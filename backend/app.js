const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // Middleware to parse JSON bodies

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://toby_guan:ilovebeans@codebrew-2024.gexpvgd.mongodb.net/?retryWrites=true&w=majority&appName=codebrew-2024')
  .then(() => console.log('Connected to MongoDB.'))
  .catch(err => console.error('Could not connect to MongoDB.', err));