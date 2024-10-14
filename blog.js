const express = require("express");
const router = express.Router();
const Blog = require("./model/Blog");

router.get("/getAllBlogs", async (req, res) => {
  try {
    const blogs = await Blog.find({}, 'title imageUrl'); // Only include title and imageUrl fields
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/getSingleBlog/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/addBlog", async (req, res) => {
  const blog = new Blog({
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    imageUrl: req.body.imageUrl,
  });

  try {
    const newBlog = await blog.save();
    res.status(201).json(newBlog);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put("/updateBlog/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    if (req.body.title != null) {
      blog.title = req.body.title;
    }
    if (req.body.content != null) {
      blog.content = req.body.content;
    }
    if (req.body.author != null) {
      blog.author = req.body.author;
    }
    if (req.body.imageUrl != null) {
      blog.imageUrl = req.body.imageUrl;
    }

    const updatedBlog = await blog.save();
    res.json(updatedBlog);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete("/deleteBlog/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    await Blog.deleteOne({ _id: req.params.id });
    res.json({ message: "Blog deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
