const express = require("express");
const router = express.Router();
const Project = require("./model/projects");


router.get("/getProjects", async (req, res) => {
  try {
    const projects = await Project.find({}, '-additionalImages'); // Exclude the additionalImages field
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.get("/getProject/:id", async (req, res) => {
    try {
      const project = await Project.findById(req.params.id);
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
       
      const response = {
        mainImage: project.mainImage,
        mainDescription: project.mainDescription,
        additionalImages: project.additionalImages,  
      };
  
      res.json(response);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  


router.post("/addProject", async (req, res) => {
  const { mainImage, mainDescription, projects, additionalImages } = req.body;

  const newProject = new Project({
    mainImage,
    mainDescription,
    projects,
    additionalImages,
  });

  try {
    const savedProject = await newProject.save();
    res.status(201).json(savedProject);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


router.put("/updateProject/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    
    if (req.body.mainImage != null) {
      project.mainImage = req.body.mainImage;
    }
    if (req.body.mainDescription != null) {
      project.mainDescription = req.body.mainDescription;
    }
    if (req.body.projects != null) {
      project.projects = req.body.projects;
    }
    if (req.body.additionalImages != null) {
      project.additionalImages = req.body.additionalImages;
    }

    const updatedProject = await project.save();
    res.json(updatedProject);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


router.delete("/deleteProject/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    await Project.deleteOne({ _id: req.params.id });
    res.json({ message: "Project deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
