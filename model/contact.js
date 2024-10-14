const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  contactNumber: {
    type: String,
  },
  email: {
    type: String,
  },
  message: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("contactSchema", contactSchema);
