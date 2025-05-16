import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EmployeeList from '../components/EmployeeList';
import LeaveManagement from '../components/LeaveManagement';
import AttendanceManagement from '../components/AttendanceManagement';
import PostFeed from "../components/PostFeed"; 
import { FaUsers, FaCalendarCheck, FaClipboardList, FaSignOutAlt, FaHome } from 'react-icons/fa';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("home");
  const navigate = useNavigate();

  const renderContent = () => {
    switch (activeTab) {
      case "employee":
        return <EmployeeList />;
      case "leave":
        return <LeaveManagement />;
      case "attendance":
        return <AttendanceManagement />;
        case "social":
          return <PostFeed />;
        default:
          return (
            <div className="dashboard-welcome">
              <h2>Welcome to HRMS Dashboard</h2>
              <p>
                This HRMS includes employee management, leave & attendance tracking,
                onboarding/offboarding workflows, and a social media feed to engage
                your employees.
              </p>
            </div>
          );
      }
    };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <h2 style={styles.logo}>HRMS</h2>

        <div style={styles.menuItem} onClick={() => setActiveTab("employee")}>
          <FaUsers style={styles.icon} />
          <span>Employee</span>
        </div>
        <div style={styles.menuItem} onClick={() => setActiveTab("leave")}>
          <FaClipboardList style={styles.icon} />
          <span>Leave</span>
        </div>
        <div style={styles.menuItem} onClick={() => setActiveTab("attendance")}>
          <FaCalendarCheck style={styles.icon} />
          <span>Attendance</span>
        </div>
        <div style={styles.menuItem} onClick={() => setActiveTab("social")}>
          <FaHome style={styles.icon} />
          <span>social</span>
        </div>

        <div style={styles.spacer} />

        <div style={{ ...styles.menuItem, color: "#ff4d4d" }} onClick={handleLogout}>
          <FaSignOutAlt style={styles.icon} />
          <span>Logout</span>
        </div>
      </div>

      {/* Main Content */}
      <div style={styles.content}>
        <h1>Welcome to HRMS Dashboard</h1>
        
        <div style={{ marginTop: '20px' }}>
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

const styles = {
  sidebar: {
    width: '220px',
    backgroundColor: '#1e1e2f',
    color: '#fff',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column'
  },
  logo: {
    fontSize: '22px',
    marginBottom: '30px',
    fontWeight: 'bold'
  },
  menuItem: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
    cursor: 'pointer',
    padding: '10px',
    borderRadius: '8px',
    transition: 'background 0.3s'
  },
  icon: {
    marginRight: '10px',
    fontSize: '18px'
  },
  content: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: '30px',
    overflowY: 'auto'
  },
  spacer: {
    flex: 1
  }
};

export default Dashboard;
