import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ username, role, onLogout }) => {
    console.log("Navbar Role:", role); // 🐞 Debug

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <span className="logo">CodeArena</span>
        <Link className="nav-link" to="/">🏠 Home</Link>
        <Link className="nav-link" to="/problems">🧠 Problems</Link>
        {role === 'admin' && (
          <Link className="nav-link" to="/admin">🛠 Admin Panel</Link>
        )}
        <Link className="nav-link" to="/submissions">📊 Submissions</Link>
      </div>
      <div className="navbar-right">
        <span className="user-text">👋 Hi, {username}</span>
        <button className="logout-btn" onClick={onLogout}>Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
