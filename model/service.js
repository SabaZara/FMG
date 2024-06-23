const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  name: {
    type: String
  },
  description: {
    type: String
  },
  shortDescription: {
    type: String
  },
  moodPhotos: [{
    type: String 
  }]
});

module.exports = mongoose.model('Service', serviceSchema);
