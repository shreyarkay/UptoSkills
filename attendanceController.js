// controllers/attendanceController.js
const Attendance = require('../models/Attendance');

// Create Attendance Record
const createAttendance = async (req, res) => {
    const { employeeId, status, remarks } = req.body;
  
    try {
      const newAttendance = new Attendance({ employeeId, status, remarks });
      await newAttendance.save();
      res.status(201).json({ message: 'Attendance marked successfully', newAttendance });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Get All Attendance Records
  const getAllAttendance = async (req, res) => {
    try {
      const attendanceRecords = await Attendance.find().populate('employeeId', 'name email');
      res.status(200).json(attendanceRecords);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

// Update Attendance Record
const updateAttendance = async (req, res) => {
  try {
    const { status, date } = req.body;
    const { id } = req.params;

    const attendance = await Attendance.findById(id);
    if (!attendance) {
      return res.status(404).json({ message: 'Attendance record not found' });
    }

    attendance.status = status || attendance.status;
    attendance.date = date || attendance.date;

    await attendance.save();
    res.status(200).json({ message: 'Attendance record updated', attendance });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Delete Attendance
const deleteAttendance = async (req, res) => {
  const { id } = req.params;

  try {
    const attendance = await Attendance.findByIdAndDelete(id);

    if (!attendance) {
      return res.status(404).json({ message: 'Attendance record not found' });
    }

    res.status(200).json({ message: 'Attendance deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add Attendance Record
const addAttendance = async (req, res) => {
  try {
    const { employeeId, status, date } = req.body;

    if (!employeeId || !status || !date) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const attendance = new Attendance({
      employeeId,
      status,
      date,
    });

    await attendance.save();
    res.status(201).json({ message: 'Attendance record added', attendance });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = { createAttendance, getAllAttendance, updateAttendance, deleteAttendance, addAttendance };