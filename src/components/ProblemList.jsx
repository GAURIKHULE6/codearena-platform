import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../style.css';

const ProblemList = ({ onSelect }) => {
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/problems')
      .then(res => setProblems(res.data))
      .catch(err => console.error('❌ Fetch error', err));
  }, []);

  return (
    <div className="problem-list">
      <h2>🧠 Practice Problems</h2>
      <ul>
        {problems.map((problem) => (
          <li key={problem.id} onClick={() => onSelect(problem)}>
            <span className="title">{problem.title}</span>
            <span className={`difficulty ${problem.difficulty.toLowerCase()}`}>{problem.difficulty}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProblemList;
