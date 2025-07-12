const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');


const app = express();

app.use(express.urlencoded({ extended: true })); // for parsing form data
app.use(express.json()); // for parsing JSON bodies

// ✅ Register route
app.post('/register', (req, res) => {
  const { username, password } = req.body;
  // Handle registration logic here
  res.send('User registered successfully!');
});


mongoose.connect('mongodb://127.0.0.1:27017/tnestia', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

app.use(bodyParser.urlencoded({ extended: true }));

// ✅ FIXED: Serve static files from the "public" directory
app.get('/public/dashboard.html', ensureLoggedIn, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'yourSecretKey',
  resave: false,
  saveUninitialized: true
}));

const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
function ensureLoggedIn(req, res, next) {
  if (req.session.user) {
    return next();
  }
  res.redirect('/');
}
