const mongoose = require('mongoose');

// Schema for individual items in the inventory
const itemSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 0 
  }
}, { _id: false }); 

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  items: [itemSchema]
});

const User = mongoose.model('User', userSchema);

module.exports = User;