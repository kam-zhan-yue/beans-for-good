const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    id: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true,
      min: 0 
    }
  }, { _id: false }); 

const storeSchema = new mongoose.Schema({
    name: {
    type: String,
    required: true
  },
    id: {
    type: String,
    required: true,
    unique: true
  },
  items: [itemSchema]
});

const Store = mongoose.model('Store', storeSchema);