const db = require('../models');
const FormData = db.formData;

// Handle form submission
const createFormData = async (req, res) => {
  try {
    const { name, rollNo } = req.body;

    if (!name || !rollNo) {
      return res.status(400).json({ message: 'Name and Roll Number are required' });
    }

    const newEntry = await FormData.create({ name, rollNo });

    return res.status(201).json({ message: 'Form data saved successfully', data: newEntry });
  } catch (error) {
    console.error('Error saving form data:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Get all form data
const getAllFormData = async (req, res) => {
  try {
    const data = await FormData.findAll();
    return res.status(200).json({ data });
  } catch (error) {
    console.error('Error fetching form data:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Get form data by ID
const getFormDataById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await FormData.findByPk(id);

    if (!data) {
      return res.status(404).json({ message: 'Form data not found' });
    }

    return res.status(200).json({ data });
  } catch (error) {
    console.error('Error fetching form data:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Update form data by ID
const updateFormData = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, rollNo } = req.body;

    const data = await FormData.findByPk(id);

    if (!data) {
      return res.status(404).json({ message: 'Form data not found' });
    }

    // Update the fields
    data.name = name || data.name;
    data.rollNo = rollNo || data.rollNo;

    await data.save();

    return res.status(200).json({ message: 'Form data updated successfully', data });
  } catch (error) {
    console.error('Error updating form data:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete form data by ID
const deleteFormData = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await FormData.findByPk(id);

    if (!data) {
      return res.status(404).json({ message: 'Form data not found' });
    }

    await data.destroy();

    return res.status(200).json({ message: 'Form data deleted successfully' });
  } catch (error) {
    console.error('Error deleting form data:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  createFormData,
  getAllFormData,
  getFormDataById,
  updateFormData,
  deleteFormData,
};
