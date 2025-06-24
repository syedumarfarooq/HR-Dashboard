const express = require('express');
const User = require('../models/User');

const router = express.Router();

// Get all users
router.get('/all-users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).send({ error: 'Error retrieving users' });
  }
});

// Add new user
router.post('/adduser', async (req, res) => {
  const { firstName, lastName, email, age, department, rating } = req.body;

  if (!firstName || !lastName || !email || !age || !department || !rating) {
    return res.status(400).send({ error: 'All fields are required' });
  }

  try {
    const newUser = new User({ firstName, lastName, email, age, department, rating });
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Error adding user' });
  }
});

module.exports = router;
