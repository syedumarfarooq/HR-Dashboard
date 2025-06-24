const express = require('express');
const router = express.Router();
const Bookmark = require('../models/Bookmark');

// Test route


// Get all bookmarks
router.get('/', async (req, res) => {
  const bookmarks = await Bookmark.find();
  res.json(bookmarks);
});

// Add a bookmark
router.post('/', async (req, res) => {
  const existing = await Bookmark.findOne({ id: req.body.id });
  if (!existing) {
    const newBookmark = new Bookmark(req.body);
    await newBookmark.save();
    res.status(201).json(newBookmark);
  } else {
    res.status(200).json(existing);
  }
});

// DELETE /api/bookmarks/:id
router.delete('/:id', async (req, res) => {
    try {
      const deleted = await Bookmark.findOneAndDelete({ id: req.params.id });
      if (deleted) {
        res.json({ message: 'Bookmark deleted' });
      } else {
        res.status(404).json({ error: 'Bookmark not found' });
      }
    } catch (err) {
      res.status(500).json({ error: 'Server error' });
    }
  });
  
module.exports = router;
