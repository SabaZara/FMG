const express = require("express");
const router = express.Router();
const about = require("./model/about");

// Get all about page images
router.get("/getAboutImages", async (req, res) => {
  try {
    const images = await about.find();
    res.json(images);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new about page image
router.post("/addAboutImage", async (req, res) => {
  const image = new about({
    imageUrl: req.body.imageUrl,
  });

  try {
    const newImage = await image.save();
    res.status(201).json(newImage);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update an about page image by ID
router.put("/updateAbout/:id", async (req, res) => {
  try {
    const image = await about.findById(req.params.id);
    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }

    if (req.body.imageUrl != null) {
      image.imageUrl = req.body.imageUrl;
    }

    const updatedImage = await image.save();
    res.json(updatedImage);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete("/deleteAbout/:id", async (req, res) => {
  try {
    const image = await about.findById(req.params.id);
    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }

    await about.deleteOne({ _id: req.params.id });
    res.json({ message: "Image deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
