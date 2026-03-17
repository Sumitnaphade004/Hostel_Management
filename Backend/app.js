require('dotenv').config();
const express = require('express');
const cors = require("cors");
const path = require('path');
const cookieParser = require('cookie-parser');

const pageRoutes = require('./routes/routes');

const app = express();

// Environment variables
const PORT = process.env.PORT || 3000;
const APP_NAME = process.env.APP_NAME || 'My App';

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({
  origin: true, 
  credentials: true,
}));

// Routes
app.use('/api/s', pageRoutes);

// Optional: error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled Error:', err);
  res.status(500).send('Something went wrong.');
});

// Start server
app.listen(PORT, () => {
  console.log(`${APP_NAME} is running at http://localhost:${PORT}`);
});
