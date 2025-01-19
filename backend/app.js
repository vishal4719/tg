// backend/app.js
const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require("./src/models");

const app = express();

// CORS options for frontend connection
const corsOptions = {
    origin: "http://localhost:3000" // Allow requests from the React frontend (running on port 3000)
};

// Use CORS middleware with the specified options
app.use(cors(corsOptions));

// Serve static files from the 'uploads' directory for file access
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Middleware for parsing JSON bodies from requests
app.use(express.json());

// Middleware for parsing URL-encoded data (form submissions)
app.use(express.urlencoded({ extended: false }));

// Welcome route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to the Website" });
});

// Import and use routes
const signupRoutes = require('./src/routes/signup.route');
app.use('/signup', signupRoutes);

const loginRoutes = require('./src/routes/login.route');
app.use('/', loginRoutes);

const dashboardRoutes = require('./src/routes/dashboard.route');
app.use('/dashboard', dashboardRoutes);

const formDataRoutes = require('./src/routes/formData.routes');
app.use('/formData', formDataRoutes);

const studentRoutes = require('./src/routes/student.route');
app.use('/api/students', studentRoutes);

// Activity points routes
const activityPointsRoutes = require('./src/routes/activityPoints.route');
app.use('/api/activities', activityPointsRoutes);

// Initialize database synchronization with Sequelize
db.sequelize.sync()
   .then(() => {
       console.log("Database synced successfully");
   })
   .catch((err) => {
       console.error("Failed to sync database:", err.message);
   });

// Set up the server to listen on the specified port
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
});
