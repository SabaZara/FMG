const express = require("express");
const router = express.Router();
const CompanyTeam = require("./model/companyTeam");

router.get("/getAllMembers", async (req, res) => {
  try {
    const teamMembers = await CompanyTeam.find(
      {},
      {
        bio: 0,
        position: 0,
      }
    );
    res.json(teamMembers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/getSingleMember/:id", async (req, res) => {
  try {
    const teamMember = await CompanyTeam.findById(req.params.id);
    if (!teamMember) {
      return res.status(404).json({ message: "Team member not found" });
    }
    res.json(teamMember);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/addMember", async (req, res) => {
  const teamMember = new CompanyTeam({
    name: req.body.name,
    position: req.body.position,
    bio: req.body.bio,
    photoUrl: req.body.photoUrl,
  });

  try {
    const newTeamMember = await teamMember.save();
    res.status(201).json(newTeamMember);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put("/updateMember/:id", async (req, res) => {
  try {
    const teamMember = await CompanyTeam.findById(req.params.id);
    if (!teamMember) {
      return res.status(404).json({ message: "Team member not found" });
    }

    if (req.body.name != null) {
      teamMember.name = req.body.name;
    }
    if (req.body.position != null) {
      teamMember.position = req.body.position;
    }
    if (req.body.bio != null) {
      teamMember.bio = req.body.bio;
    }
    if (req.body.photoUrl != null) {
      teamMember.photoUrl = req.body.photoUrl;
    }

    const updatedTeamMember = await teamMember.save();
    res.json(updatedTeamMember);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete("/deleteMember/:id", async (req, res) => {
  try {
    const teamMember = await CompanyTeam.findById(req.params.id);
    if (!teamMember) {
      return res.status(404).json({ message: "Team member not found" });
    }

    await teamMember.deleteOne();
    res.json({ message: "Team member deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
