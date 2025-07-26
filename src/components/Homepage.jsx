import React from 'react';
import '../style.css';
import { Link } from 'react-router-dom';

const Homepage = () => {
  return (
    <div className="homepage">
      <h1>🚀 Welcome to CodeArena</h1>
      <p>Sharpen your coding skills, take challenges, and grow.</p>
      <div className="cards">
        <Link to="/problems" className="home-card">
          <h3>🧠 Solve Problems</h3>
          <p>Practice coding problems categorized by difficulty.</p>
        </Link>
        <Link to="/editor" className="home-card">
          <h3>💻 Code Editor</h3>
          <p>Write, test, and debug your code online.</p>
        </Link>
        <Link to="/leaderboard" className="home-card">
          <h3>🏆 Leaderboard</h3>
          <p>Check your ranking and compete with others.</p>
        </Link>
      </div>
    </div>
  );
};

export default Homepage;

