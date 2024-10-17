const express = require("express");
const router = express.Router();
const Project = require("./model/projects");

router.get("/getProjects", async (req, res) => {
  try {
    const projects = await Project.find(
      {},
      { "projects.additionalImages": 0, "projects.description": 0 }
    );
    res.json(projects[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/getProject/:id", async (req, res) => {
  try {
    const projectMainObject = await Project.find();

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
  const { imageUrl, name, description, additionalImages } = req.body;

  if (!additionalImages || additionalImages.length < 3) {
    return res
      .status(400)
      .json({ message: "At least 3 additional images are required." });
  }

  const newProjectItem = {
    imageUrl,
    name,
    description,
    additionalImages,
  };

  try {
    let project = await Project.find() 
    console.log(project[0])
    project = project[0]
    if (!project) {
      return res.status(404).json({ message: "Project document not found" });
    }

    project.projects.push(newProjectItem);

    const updatedProject = await project.save();
    res.status(201).json(updatedProject);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put("/updateProject/:id", async (req, res) => {
  try {
    const project = await Project.findOne({ "projects._id": req.params.id });
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const projectItem = project.projects.id(req.params.id);
    if (req.body.imageUrl != null) {
      projectItem.imageUrl = req.body.imageUrl;
    }
    if (req.body.name != null) {
      projectItem.name = req.body.name;
    }
    if (req.body.description != null) {
      projectItem.description = req.body.description;
    }
    if (req.body.additionalImages != null) {
      projectItem.additionalImages = req.body.additionalImages;
    }

    const updatedProject = await project.save();
    res.json(updatedProject);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete("/deleteProject/:id", async (req, res) => {
  try {
    const project = await Project.findOne({ "projects._id": req.params.id });
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Remove the specific project from the array
    project.projects.id(req.params.id).remove();

    await project.save();
    res.json({ message: "Project deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
