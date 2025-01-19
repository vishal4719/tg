const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const activityPointsController = require('../controllers/activitypoints.controller');
const { ActivityPoints } = require('../models'); // Import Sequelize model

// Set up multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// Route to submit activity points
router.post('/submit', upload.single('certificate_file'), activityPointsController.submitActivity);

// Route to fetch activities for a student
router.get('/:student_id', activityPointsController.getActivities);

// ------------------- NEW ROUTES -------------------

// Fetch all pending activities
router.get('/pending', async (req, res) => {
  try {
    const activities = await ActivityPoints.findAll({ where: { status: 'pending' } });
    res.status(200).json({ success: true, data: activities });
  } catch (error) {
    console.error('Error fetching pending activities:', error);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
});

// Update activity status
router.put('/:id', async (req, res) => {
  const { status, hours_approved, admin_comments } = req.body;

  try {
    const activity = await ActivityPoints.findByPk(req.params.id);

    if (!activity) {
      return res.status(404).json({ success: false, error: 'Activity not found' });
    }

    // Update the activity
    activity.status = status || activity.status;
    activity.hours_approved = hours_approved || activity.hours_approved;
    activity.admin_comments = admin_comments || activity.admin_comments;

    await activity.save();

    res.status(200).json({ success: true, data: activity });
  } catch (error) {
    console.error('Error updating activity:', error);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
});

// Create a new activity (for testing or seeding)
router.post('/create', async (req, res) => {
  const {
    student_id,
    activity_type,
    activity_name,
    hours_requested,
    certificate_id,
    certificate_by,
    certificate_file,
  } = req.body;

  try {
    const newActivity = await ActivityPoints.create({
      student_id,
      activity_type,
      activity_name,
      hours_requested,
      certificate_id,
      certificate_by,
      certificate_file,
    });

    res.status(201).json({ success: true, data: newActivity });
  } catch (error) {
    console.error('Error creating activity:', error);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
});

// ---------------------------------------------------

module.exports = router;
