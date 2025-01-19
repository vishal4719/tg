const express = require('express');
const signupController = require('../controllers/signup.controller');

const router = express.Router();

// POST request to /api/signup will trigger the signupController.create function
router.post('/', signupController.create);

module.exports = router;