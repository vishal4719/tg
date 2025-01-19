const { get } = require('http');
const db = require('../models');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log('req.params', req.params);
        const documentType  = req.params.type || {};
        let dest = 'uploads';

        // If documentType is provided, append it to the destination
        if (documentType) {
            dest = path.join('uploads', documentType);
        }

        // Ensure the directory exists
        if (!fs.existsSync(dest)) {
            fs.mkdirSync(dest, { recursive: true });
        }

        cb(null, dest);
    },
    filename: (req, file, cb) => {
        const uniqueName = `${req.body.studentForeginId || 'unknown'}-${file.originalname}`;
        cb(null, uniqueName);
    }
});

 const upload = multer({  storage });
 const uploadDocument = async (req, res) => {

    try {
        const { documentType, studentForeginId } = req.body;


        if (!studentForeginId || !documentType) {
            return res
                .status(400)
                .json({ message: "Student ID and document type are required." });
        }

        // Prepare the field to update dynamically
        const updateData = {};
        updateData[documentType] = req.file.filename;

        // Check if a record exists for the student ID
        const studentId = await db.signup.findOne({
            where: { UID: studentForeginId },
        });
        const Dashboard_id = await db.dashboard.findOne({
            where: { student_foregin_id: studentId.id },
        });
        const existingRecord = await db.uploadDocs.findOne({
            where: { Dashboard_id: Dashboard_id.dashboard_primary_key },
        });

        if (existingRecord) {
            console.log('existingRecord', existingRecord);
            console.log('updateData', updateData);
            // Update the specific field in the existing record
            await db.uploadDocs.update(updateData, {
                where: { Dashboard_id: Dashboard_id.dashboard_primary_key },
            });

            return res.status(200).json({
                message: `${documentType} updated successfully.`,
                data: updateData,
            });
        } else {
            // Create a new record with the given student ID and document
            const newRecordData = { Dashboard_id: Dashboard_id.dashboard_primary_key , ...updateData };
            const newRecord = await db.uploadDocs.create(newRecordData);

            return res.status(201).json({
                message: `${documentType} uploaded successfully.`,
                data: newRecord,
            });
        }
    } catch (error) {
        console.error("Error handling document upload:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
};

const getDocuments = async (req, res) => {
    try {
        const studentForeginId = req.params.studentForeginId; // Ensure this is set correctly
        const student = await db.signup.findOne({
            where: { UID: studentForeginId }
        });
        const dashboard = await db.dashboard.findOne({
            where: { student_foregin_id: student.id }
        });
        const documents = await db.uploadDocs.findAll({
            where: { Dashboard_id: dashboard.dashboard_primary_key }
        });
        res.status(200).json({ documents });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving documents', error });
    }
};

module.exports = {
    upload,
    uploadDocument,
    getDocuments
};