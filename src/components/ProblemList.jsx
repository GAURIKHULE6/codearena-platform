import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProblemList = ({ onSelect }) => {
  const [problems, setProblems] = useState([]);
  const [difficulty, setDifficulty] = useState('');

  const fetchProblems = async (level = '') => {
    const url = level
      ? `http://localhost:5000/api/problems?difficulty=${level}`
      : `http://localhost:5000/api/problems`;
    
    try {
      const res = await axios.get(url);
      console.log('✔ Problems:', res.data); // ✅ Debug log
      setProblems(res.data);
    } catch (err) {
      console.error('❌ Error fetching problems:', err); // ✅ Error log
    }
  };

  useEffect(() => {
    fetchProblems(); // ✅ call once on mount
  }, []);

  return (
    <div className="problem-list">
      <h2>🧠 Coding Challenges</h2>

      <div className="filter-bar">
        <button onClick={() => fetchProblems('Easy')}>🟢 Easy</button>
        <button onClick={() => fetchProblems('Medium')}>🟡 Medium</button>
        <button onClick={() => fetchProblems('Hard')}>🔴 Hard</button>
        <button onClick={() => fetchProblems('')}>All</button>
      </div>

      <ul>
        {problems.map(problem => (
          <li key={problem.id}>
            <button onClick={() => onSelect(problem)}>
              {problem.title} ({problem.difficulty})
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProblemList;
