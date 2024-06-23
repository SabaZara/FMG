const mongoose = require("mongoose");

const aboutSchema = new mongoose.Schema({
  imageUrl: {
    type: String
  }
});

module.exports = mongoose.model("About", aboutSchema);
