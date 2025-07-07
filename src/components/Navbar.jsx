import React from 'react';

const Navbar = ({ username, onLogout }) => {
  return (
    <nav className="navbar">
      <div className="nav-left">
        <h2 className="logo">CodeArena</h2>
        <a href="#">🏠 Home</a>
        <a href="#">🧠 Problems</a>
        <a href="#">📊 Submissions</a>
      </div>
      <div className="nav-right">
        <span>👋 Hi, {username}</span> {/* ✅ username is just string now */}
        <button onClick={onLogout}>Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
