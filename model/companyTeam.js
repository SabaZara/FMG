const mongoose = require("mongoose");

const companyTeamSchema = new mongoose.Schema({
  name: {
    type: String
  },
  position: {
    type: String
  },
  bio: {
    type: String
  },
  photoUrl: {
    type: String
  },
  joinedAt: {
    type: Date,
    default: Date.now,
  },
});

const CompanyTeam = mongoose.model("CompanyTeam", companyTeamSchema);

module.exports = CompanyTeam;
