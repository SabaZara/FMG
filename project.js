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
    let project = await Project.find();
    console.log(project[0]);
    project = project[0];
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
    // Find the main project document (since you have only one)
    const mainProject = await Project.findOne();

    if (!mainProject) {
      return res
        .status(404)
        .json({ message: "Main project document not found" });
    }

    // Always update main fields if they exist in the request body, regardless of the ID
    if (req.body.mainImage != null) {
      mainProject.mainImage = req.body.mainImage;
    }

    if (req.body.mainDescription != null) {
      mainProject.mainDescription = req.body.mainDescription;
    }

    // Now, check if we are also trying to update a sub-project
    if (req.params.id) {
      const subProject = mainProject.projects.id(req.params.id);

      // Only attempt to update the sub-project if a valid one is found
      if (subProject) {
        // Dynamically update only the fields provided for the sub-project
        if (req.body.imageUrl != null) {
          subProject.imageUrl = req.body.imageUrl;
        }
        if (req.body.name != null) {
          subProject.name = req.body.name;
        }
        if (req.body.description != null) {
          subProject.description = req.body.description;
        }
        if (req.body.additionalImages != null) {
          subProject.additionalImages = req.body.additionalImages;
        }
      } else {
        // If no valid sub-project was found, we can still proceed with main project updates
        return res.status(404).json({
          message: "Sub-project not found, but main project was updated",
        });
      }
    }

    // Save the updated main project (whether updating main fields or sub-projects)
    const updatedProject = await mainProject.save();
    res.json(updatedProject);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete("/deleteProject/:id", async (req, res) => {
  try {
    // Find the document containing the projects array that has the specific project ID
    const project = await Project.findOne({ "projects._id": req.params.id });

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Pull the project with the specific ID from the array
    project.projects.pull({ _id: req.params.id });

    // Save the updated document after removing the project
    await project.save();

    res.json({ message: "Project deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
