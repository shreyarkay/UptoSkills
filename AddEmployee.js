import React, { useState } from 'react';

const AddEmployee = () => {
  const [employeeData, setEmployeeData] = useState({
    name: '',
    email: '',
    position: '',
    department: '',
    salary: '',
  });

  const handleChange = (e) => {
    setEmployeeData({ ...employeeData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/employees', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(employeeData),
      });

      const result = await response.json();
      if (response.ok) {
        alert('Employee added successfully!');
        setEmployeeData({
          name: '',
          email: '',
          position: '',
          department: '',
          salary: '',
        });
      } else {
        alert(result.message || 'Failed to add employee');
      }
    } catch (error) {
      console.error('Error adding employee:', error);
      alert('Error adding employee');
    }
  };

  return (
    <div>
      <h1>Add Employee</h1>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" name="name" value={employeeData.name} onChange={handleChange} required />

        <label>Email:</label>
        <input type="email" name="email" value={employeeData.email} onChange={handleChange} required />

        <label>Position:</label>
        <input type="text" name="position" value={employeeData.position} onChange={handleChange} required />

        <label>Department:</label>
        <input type="text" name="department" value={employeeData.department} onChange={handleChange} required />

        <label>Salary:</label>
        <input type="number" name="salary" value={employeeData.salary} onChange={handleChange} required />

        <button type="submit">Add Employee</button>
      </form>
    </div>
  );
};

export default AddEmployee;
