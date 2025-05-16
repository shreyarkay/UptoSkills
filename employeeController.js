const Employee = require('../models/Employee');

// Get all employees
const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new employee
const createEmployee = async (req, res) => {
  const { name, email, position } = req.body;
  try {
    const employee = new Employee({ name, email, position });
    await employee.save();
    res.status(201).json(employee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Employee
const updateEmployee = async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;
  
    try {
      const employee = await Employee.findByIdAndUpdate(id, updateData, { new: true });
      if (!employee) {
        return res.status(404).json({ message: 'Employee not found' });
      }
      res.status(200).json(employee);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  //Get Employee
  const getEmployeeById = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Validate ObjectId
      if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({ message: 'Invalid employee ID' });
      }
  
      const employee = await Employee.findById(id);
  
      if (!employee) {
        return res.status(404).json({ message: 'Employee not found' });
      }
  
      res.status(200).json(employee);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };  

// Delete Employee
const deleteEmployee = async (req, res) => {
    const { id } = req.params;
  
    try {
      const employee = await Employee.findByIdAndDelete(id);
      if (!employee) {
        return res.status(404).json({ message: 'Employee not found' });
      }
      res.status(200).json({ message: 'Employee deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };  

module.exports = { getEmployees, createEmployee, updateEmployee, getEmployeeById, deleteEmployee };
