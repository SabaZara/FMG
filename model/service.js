const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  shortDescription: {
    type: String
  },
  moodPhotos: [{
    type: String 
  }]
});

module.exports = mongoose.model('Service', serviceSchema);
