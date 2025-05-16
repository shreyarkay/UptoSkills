import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({ name: '', email: '', phone: '', role: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`http://localhost:5000/api/employees/${id}`)
      .then((response) => response.json())
      .then((data) => setEmployee(data))
      .catch((err) => setError('Failed to fetch employee data'));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/employees/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(employee),
      });
      if (!response.ok) throw new Error('Failed to update employee');
      alert('Employee updated successfully!');
      navigate('/employees');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h2>Edit Employee</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>Name: <input type="text" name="name" value={employee.name} onChange={handleChange} /></label><br />
        <label>Email: <input type="email" name="email" value={employee.email} onChange={handleChange} /></label><br />
        <label>Phone: <input type="text" name="phone" value={employee.phone} onChange={handleChange} /></label><br />
        <label>Role: <input type="text" name="role" value={employee.role} onChange={handleChange} /></label><br />
        <button type="submit">Update Employee</button>
      </form>
    </div>
  );
};

export default EditEmployee;
