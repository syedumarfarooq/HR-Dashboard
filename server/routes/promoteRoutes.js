const express = require('express');
const router = express.Router();
const Promote = require('../models/Promote');

// Get all promoted users
router.get('/', async (req, res) => {
  const promoted = await Promote.find();
  res.json(promoted);
});

// Add a user to promote
router.post('/', async (req, res) => {
  const exists = await Promote.findOne({ id: req.body.id });
  if (!exists) {
    const newPromotion = new Promote(req.body);
    await newPromotion.save();
    res.status(201).json(newPromotion);
  } else {
    res.status(200).json(exists);
  }
});

module.exports = router;
