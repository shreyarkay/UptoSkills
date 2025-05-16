import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import EmployeeList from './components/EmployeeList';
import CreateEmployee from './components/CreateEmployee';
import AddEmployee from './components/AddEmployee';
import EditEmployee from './components/EditEmployee';
import AttendanceManagement from './components/AttendanceManagement';
import LeaveManagement from './components/LeaveManagement';
import Onboarding from './components/Onboarding';
import Offboarding from './components/Offboarding';
import Recruitment from './components/Recruitment';
import AdminDashboard from './components/AdminDashboard';
import LoginRegisterPage from './LoginRegisterPage';
import './styles/App.css';

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<LoginRegisterPage />} />
        {/* Placeholder for dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/employees" element={<EmployeeList />} />
        <Route path="/create-employee" element={<CreateEmployee />} />
        <Route path="/add-employee" element={<AddEmployee />} />
        <Route path="/employees/edit/:id" element={<EditEmployee />} />
        <Route path="/attendance" element={<AttendanceManagement />} />
        <Route path="/leave" element={<LeaveManagement />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/offboarding" element={<Offboarding />} />
        <Route path="/recruitment" element={<Recruitment />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
