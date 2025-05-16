import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AttendanceManagement = () => {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [employeeId, setEmployeeId] = useState('');
  const [status, setStatus] = useState('Present');

  // Fetch all attendance records
  const fetchAttendance = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/attendance');
      setAttendanceRecords(response.data);
    } catch (error) {
      console.error('Error fetching attendance:', error);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  // Add attendance record
  const addAttendance = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/attendance', { employeeId, status });
      alert('Attendance Added Successfully');
      fetchAttendance();
    } catch (error) {
      console.error('Error adding attendance:', error);
    }
  };

  // Delete attendance record
  const deleteAttendance = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/attendance/${id}`);
      alert('Attendance Deleted Successfully');
      fetchAttendance();
    } catch (error) {
      console.error('Error deleting attendance:', error);
    }
  };

  return (
    <div>
      <h2>Attendance Management</h2>

      {/* Form to Add Attendance */}
      <form onSubmit={addAttendance}>
        <label>Employee ID:</label>
        <input
          type="text"
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
          required
        />

        <label>Status:</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="Present">Present</option>
          <option value="Absent">Absent</option>
          <option value="Leave">Leave</option>
        </select>

        <button type="submit">Add Attendance</button>
      </form>

      {/* Attendance Table */}
      {attendanceRecords.length === 0 ? (
        <p>No attendance records found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {attendanceRecords.map((record) => (
              <tr key={record._id}>
                <td>{record.employeeId?.name || 'N/A'}</td>
                <td>{record.status}</td>
                <td>{new Date(record.date).toLocaleDateString()}</td>
                <td>
                  <button onClick={() => deleteAttendance(record._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AttendanceManagement;