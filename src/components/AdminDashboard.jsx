// src/components/AdminDashboard.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard-content">
      <h1>Welcome, Admin</h1>
      <div className="admin-cards">
        <Link to="/manage-developers" className="admin-card">
          <h3>Manage Developers</h3>
          <p>View and manage registered developers.</p>
        </Link>

        <Link to="/manage-recruiters" className="admin-card">
          <h3>Manage Recruiters</h3>
          <p>Review and manage recruiter accounts.</p>
        </Link>

        <Link to="/manage-contests" className="admin-card">
          <h3>Manage Contests</h3>
          <p>Create, update, or delete coding contests.</p>
        </Link>

        <Link to="/view-reports" className="admin-card">
          <h3>View Reports</h3>
          <p>Track platform statistics and activity logs.</p>
        </Link>

        <Link to="/add-problems" className="admin-card">
          <h3>Add Problems</h3>
          <p>Create and manage coding problems for practice & contests.</p>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
