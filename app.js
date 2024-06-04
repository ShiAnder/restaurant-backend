// app.js
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

// Restaurant routes
const restaurantRoutes = require('./routes/restaurant');
app.use('/api/restaurants', restaurantRoutes);

// Serve static files from the React app
const buildPath = path.join(__dirname, '..', 'restaurant-frontend', 'build');
app.use(express.static(buildPath));

// Route for serving the React app's HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});


// // Route for serving the React app's HTML file for /create route
// app.get('/create', (req, res) => {
//   res.sendFile(path.join(buildPath, 'index.html'));
// });

// Route for serving the React app's HTML file for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
