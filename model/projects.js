const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  mainImage: {
    type: String,
  },
  mainDescription: {
    type: String,
  },
  projects: [
    {
      imageUrl: {
        type: String,
      },
      name: {
        type: String,
      },
      description: {
        type: String,  
      },
      additionalImages: [
        {
          type: String,
        },
      ],
    },
  ],
});

module.exports = mongoose.model("Project", ProjectSchema);
