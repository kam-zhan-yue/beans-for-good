const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, // Ensuring username uniqueness
  password: { type: String, required: true },
}, {
  collection: 'users'
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
