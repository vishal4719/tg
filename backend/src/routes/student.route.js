// src/routes/student.route.js
const express = require('express');
const router = express.Router();
const db = require('../models');
const { Op } = require('sequelize');

// Search students endpoint
router.get('/search', async (req, res) => {
    const { roll_no, division, year_of_admission, branch } = req.query;
    
    try {
        const whereClause = {};
        
        if (roll_no) whereClause.roll_no = roll_no;
        if (division) whereClause.division = division;
        if (year_of_admission) whereClause.year_of_admission = year_of_admission;
        if (branch) whereClause.branch = branch;

        const students = await db.signup.findAll({
            where: whereClause,
            attributes: [
                'id',
                'UID',
                'student_name',
                'surname',
                'roll_no',
                'division',
                'branch',
                'year_of_admission',
                'stud_email',
                'stud_phone_no'
            ],
            order: [['roll_no', 'ASC']]
        });

        return res.status(200).json({
            success: true,
            data: students
        });

    } catch (error) {
        console.error('Error searching students:', error);
        return res.status(500).json({
            success: false,
            message: 'Error searching students',
            error: error.message
        });
    }
});

module.exports = router;