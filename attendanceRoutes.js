const express = require('express');
const router = express.Router();
const { createAttendance, getAllAttendance, updateAttendance, deleteAttendance, addAttendance } = require('../controllers/attendanceController');

// POST: Mark Attendance
router.post('/', createAttendance);

// GET: View Attendance Records
router.get('/', getAllAttendance);

// Add Attendance Route
router.post('/', addAttendance);

// Update Attendance
router.put('/:id', updateAttendance);

// Delete Attendance
router.delete('/:id', deleteAttendance);

module.exports = router;







