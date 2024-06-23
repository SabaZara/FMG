const express = require("express");
const router = express.Router();
const HomeCarousel = require("./model/home");

router.get("/getHomeCarousel", async (req, res) => {
  try {
    const images = await HomeCarousel.find();
    res.json(images);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/addHomeCarousel", async (req, res) => {
  const image = new HomeCarousel({
    imageUrl: req.body.imageUrl,
  });

  try {
    const newImage = await image.save();
    res.status(201).json(newImage);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put("/updateHomeCarousel/:id", async (req, res) => {
  try {
    const image = await HomeCarousel.findById(req.params.id);
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

router.delete("/deleteHomeCarouselImage/:id", async (req, res) => {
  try {
    const image = await HomeCarousel.findById(req.params.id);
    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }

    await HomeCarousel.deleteOne({ _id: req.params.id });
    res.json({ message: "Image deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
