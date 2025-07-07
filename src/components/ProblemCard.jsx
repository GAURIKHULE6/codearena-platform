import React from 'react';
import { Link } from 'react-router-dom';

const ProblemCard = ({ problem }) => (
  <div className="problem-card">
    <h3>{problem.title}</h3>
    <p>{problem.difficulty}</p>
    <Link to={`/problems/${problem.id}`}>Solve ➤</Link>
  </div>
);

export default ProblemCard;
