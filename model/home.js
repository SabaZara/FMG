const mongoose = require("mongoose");

const homeSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
  },
  text: {
    type: String,
  },
});

module.exports = mongoose.model("Home", homeSchema);
