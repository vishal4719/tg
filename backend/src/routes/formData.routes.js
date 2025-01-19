const express = require('express');
const router = express.Router();
const formDataController = require('../controllers/formData.controller');

// POST route for form submission
router.post('/submit', formDataController.createFormData);

// GET route to retrieve all form data
router.get('/all', formDataController.getAllFormData);

// GET route to retrieve form data by ID
router.get('/:id', formDataController.getFormDataById);

// PUT route to update form data by ID
router.put('/:id', formDataController.updateFormData);

// DELETE route to delete form data by ID
router.delete('/:id', formDataController.deleteFormData);

module.exports = router;
