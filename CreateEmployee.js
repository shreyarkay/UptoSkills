import React, { useState } from 'react';

const CreateEmployee = () => {
  const [employeeData, setEmployeeData] = useState({
    name: '',
    email: '',
    phone: '',
    position: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData({ ...employeeData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/employees', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(employeeData),
      });

      const data = await response.json();
      if (response.ok) {
        alert('Employee created successfully!');
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to create employee.');
    }
  };

  return (
    <div>
      <h2>Create Employee</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name: <input type="text" name="name" value={employeeData.name} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Email: <input type="email" name="email" value={employeeData.email} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Phone: <input type="text" name="phone" value={employeeData.phone} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Position: <input type="text" name="position" value={employeeData.position} onChange={handleChange} required />
        </label>
        <br />
        <button type="submit">Create Employee</button>
      </form>
    </div>
  );
};

export default CreateEmployee;
