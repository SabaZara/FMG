const express = require("express");
const router = express.Router();
const Project = require("./model/projects");

router.get("/getProjects", async (req, res) => {
  try {
    const projects = await Project.find({}, { "projects.additionalImages": 0 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/getProject/:id", async (req, res) => {
  try {
    const projectMainObject = await Project.find();

    // Assuming you want to look into the 'projects' field of the first document
    if (projectMainObject.length === 0) {
      return res.status(404).json({ message: "No projects found" });
    }

    const project = projectMainObject[0].projects.find((item) => {
      return item._id.toString() === req.params.id;
    });

    if (!project) {
      return res.status(409).json({ message: "Project not found" });
    }

    res.json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/addProject", async (req, res) => {
  const { imageUrl, name, additionalImages } = req.body;

  // Validate if additionalImages array has at least 3 items
  if (!additionalImages || additionalImages.length < 3) {
    return res
      .status(400)
      .json({ message: "At least 3 additional images are required." });
  }

  const newProjectItem = {
    imageUrl,
    name,
    additionalImages, // This will store the array of additional images
  };

  try {
    // Find the first project document (or adjust to update a specific one)
    const project = await Project.findOne(); // Modify this to specify the document if necessary

    if (!project) {
      return res.status(404).json({ message: "Project document not found" });
    }

    // Push the new project item into the projects array
    project.projects.push(newProjectItem);

    // Save the updated document
    const updatedProject = await project.save();
    res.status(201).json(updatedProject);
  } catch (err) {
    res.status(500).json({ message: err.message });
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
