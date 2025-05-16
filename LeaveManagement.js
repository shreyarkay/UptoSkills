import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LeaveManagement = () => {
  const [leaves, setLeaves] = useState([]);
  const [formData, setFormData] = useState({
    employeeName: "",
    leaveType: "",
    startDate: "",
    endDate: "",
    reason: "",
  });

  useEffect(() => {
    fetchLeaves();
  }, []);

  const fetchLeaves = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/leave");
      setLeaves(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/leave", formData);
      toast.success("Leave request submitted!");
      fetchLeaves();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to submit leave request");
    }
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      await axios.put(`http://localhost:5000/api/leave/${id}`, { status });
      toast.success("Status updated!");
      fetchLeaves();
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  return (
    <div>
      <ToastContainer />
      <h2>Leave Management</h2>

      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Employee Name" required onChange={(e) => setFormData({ ...formData, employeeName: e.target.value })} />
        <input type="text" placeholder="Leave Type" required onChange={(e) => setFormData({ ...formData, leaveType: e.target.value })} />
        <input type="date" required onChange={(e) => setFormData({ ...formData, startDate: e.target.value })} />
        <input type="date" required onChange={(e) => setFormData({ ...formData, endDate: e.target.value })} />
        <input type="text" placeholder="Reason" required onChange={(e) => setFormData({ ...formData, reason: e.target.value })} />
        <button type="submit">Submit Leave</button>
      </form>

      <h3>Leave Requests</h3>
      {leaves.map((leave) => (
        <div key={leave._id}>
          <p>{leave.employeeName} - {leave.leaveType} - {leave.status}</p>
          <button onClick={() => handleStatusUpdate(leave._id, "Approved")}>Approve</button>
          <button onClick={() => handleStatusUpdate(leave._id, "Rejected")}>Reject</button>
        </div>
      ))}
    </div>
  );
};

export default LeaveManagement;
