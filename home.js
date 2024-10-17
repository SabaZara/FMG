const express = require("express");
const router = express.Router();
const HomeCarousel = require("./model/home");

router.get("/getHomeCarousel", async (req, res) => {
  try {
    const objs = await HomeCarousel.find();
    res.json(objs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
  
});


// router.post("/addHomeCarousel", async (req, res) => {
//   const obj = new HomeCarousel({
//     imageUrl: req.body.imageUrl,
//     text: req.body.text,  
//   });

//   try {
//     const newObj = await obj.save();
//     res.status(201).json(newObj);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

router.put("/updateHomeCarousel/:id", async (req, res) => {
  try {
    const obj = await HomeCarousel.findById(req.params.id);
    if (!obj) {
      return res.status(404).json({ message: "Object not found" });
    }

    if (req.body.imageUrl != null) {
      obj.imageUrl = req.body.imageUrl;
    }

    if (req.body.text != null) {
      obj.text = req.body.text; 
    }

    const updatedObj = await obj.save();
    res.json(updatedObj);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete("/deleteHomeCarouselImage/:id", async (req, res) => {
  try {
    const obj = await HomeCarousel.findById(req.params.id);
    if (!obj) {
      return res.status(404).json({ message: "Object not found" });
    }

    await HomeCarousel.deleteOne({ _id: req.params.id });
    res.json({ message: "Object deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
