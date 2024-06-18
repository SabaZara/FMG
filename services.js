const express = require("express");
const router = express.Router();
const Service = require("./model/service");


router.get("/getAllServices", async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.get("/getSingleService/:id", async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }
    res.json(service);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.post("/addServices", async (req, res) => {
  const service = new Service({
    entityType: req.body.entityType,
    name: req.body.name,
    description: req.body.description,
    shortDescription: req.body.shortDescription,
    moodPhotos: req.body.moodPhotos,
  });

  try {
    const newService = await service.save();
    res.status(201).json(newService);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


router.put("/updateService/:id", async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    service.entityType = req.body.entityType;
    service.name = req.body.name;
    service.description = req.body.description;
    service.shortDescription = req.body.shortDescription;
    service.moodPhotos = req.body.moodPhotos;

    const updatedService = await service.save();
    res.json(updatedService);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


router.delete('/deleteService/:id', async (req, res) => {
    try {
      const service = await Service.findById(req.params.id);
      if (!service) {
        return res.status(404).json({ message: 'Service not found' });
      }
  
      await Service.deleteOne({ _id: req.params.id });
      res.json({ message: 'Service deleted' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

module.exports = router;
