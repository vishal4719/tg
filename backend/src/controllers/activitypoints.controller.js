const db = require('../models');  // Ensure the model is imported correctly
console.log(db.activityPoints);  // Debugging line to check model

exports.submitActivity = async (req, res) => {
  const { student_id, activity_type, activity_name, hours_requested, certificate_id, certificate_by } = req.body;
  const certificate_file = req.file ? req.file.filename : null;

  console.log(db.activityPoints);  // Ensure it's being logged properly
  try {
    // Step 1: Check if the student_id exists in the dashboards table
    const dashboard = await db.dashboard.findOne({
      where: { dashboard_primary_key: student_id },
    });

    if (!dashboard) {
      return res.status(400).json({ message: `No dashboard record found for student_id: ${student_id}` });
    }

    // Step 2: Proceed with activity creation if student_id is valid
    const activity = await db.activityPoints.create({
      student_id,
      activity_type,
      activity_name,
      hours_requested,
      certificate_id,
      certificate_by,
      certificate_file,
    });

    res.status(201).json({ message: 'Activity submitted successfully', data: activity });
  } catch (err) {
    console.error('Error submitting activity:', err);
    res.status(500).json({ message: 'Error submitting activity', error: err.message });
  }
};



// Controller to fetch activities for a student
exports.getActivities = async (req, res) => {
  const { student_id } = req.params;

  try {
    const activities = await db.activityPoints.findAll({
      where: { student_id },
    });

    // Calculate total approved hours
    const totalApprovedHours = activities.reduce((total, activity) => total + (activity.hours_approved || 0), 0);

    res.json({ data: { activities, totalApprovedHours } });
  } catch (err) {
    console.error('Error fetching activities:', err);
    res.status(500).json({ message: 'Error fetching activities', error: err.message });
  }
};
