// routes/auth.js
const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const newUser = new User({ name, email, password: hashedPassword, role });
    await newUser.save();
    res.redirect('/');
  } catch (err) {
    res.status(400).send('User already exists or registration error.');
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) return res.status(400).send('User not found');
  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).send('Incorrect password');

  req.session.user = { name: user.name, role: user.role };
  res.redirect('/dashboard.html');
});

module.exports = router;
