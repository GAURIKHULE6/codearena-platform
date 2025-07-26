import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../style.css';

const Leaderboard = () => {
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/leaderboard')
      .then(res => setLeaders(res.data))
      .catch(err => console.error("Leaderboard fetch error:", err));
  }, []);

  return (
    <div className="leaderboard-container">
      <h2 className="leaderboard-title">🏆 Top Coders Leaderboard</h2>
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>User</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {leaders.map((user, index) => (
            <tr key={index}>
              <td>#{index + 1}</td>
              <td>{user.username}</td>
              <td>{user.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
