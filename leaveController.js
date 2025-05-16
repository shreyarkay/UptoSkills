const Leave = require("../models/Leave");

// Create leave request
exports.createLeave = async (req, res) => {
  try {
    const { employeeName, leaveType, startDate, endDate, reason } = req.body;
    if (!employeeName || !leaveType || !startDate || !endDate || !reason) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const leave = new Leave({ employeeName, leaveType, startDate, endDate, reason });
    await leave.save();
    res.status(201).json(leave);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all leave requests
exports.getLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find();
    res.status(200).json(leaves);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update leave status
exports.updateLeaveStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const leave = await Leave.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!leave) return res.status(404).json({ message: "Leave request not found" });
    res.status(200).json(leave);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
