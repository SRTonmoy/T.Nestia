const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User'); // ✅ FIXED path

// Register Route
router.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body;

  const existing = await User.findOne({ email });
  if (existing) {
    return res.send('⚠️ Email already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    name,
    email,
    password: hashedPassword,
    role
  });

  await user.save();
  res.redirect('/');
});

// Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.send('❌ Invalid email');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.send('❌ Invalid password');

  req.session.user = user;
  res.redirect('/dashboard.html');
});

module.exports = router;
