const mongoose = require("mongoose");

const companyTeamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    required: true,
  },
  photoUrl: {
    type: String,
    required: false,
  },
  joinedAt: {
    type: Date,
    default: Date.now,
  },
});

const CompanyTeam = mongoose.model("CompanyTeam", companyTeamSchema);

module.exports = CompanyTeam;
