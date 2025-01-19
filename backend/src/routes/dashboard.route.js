const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboard.contoller');

router.post('/upload/:type', dashboardController.upload.single('file'), dashboardController.uploadDocument
);


router.get('/getDocuments/:studentForeginId', dashboardController.getDocuments);
module.exports = router;