const express = require("express");
const router = express.Router();
const Contact = require('./model/contact')

router.get("/getContacts", async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/getContact/:id", async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.json(contact);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.post("/addContact", async (req, res) => {
  try {
    const { name, contactNumber, email, message } = req.body; 

    const newContact = new Contact({
      name,
      contactNumber,
      email,
      message,  
    });

    // Save the new contact to the database
    const savedContact = await newContact.save();

    res.status(201).json(savedContact);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete("/deleteContact/:id", async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    await Contact.deleteOne({ _id: req.params.id });
    res.json({ message: "Contact deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.delete("/deleteAllContacts", async (req, res) => {
  try {
    await Contact.deleteMany({});
    res.json({ message: "All contacts deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
