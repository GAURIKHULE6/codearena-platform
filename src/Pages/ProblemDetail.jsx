import React from 'react';
import { useParams } from 'react-router-dom';
import Editor from '../components/Editor';

const mockProblems = {
  '1': {
    title: 'Two Sum',
    description: 'Given an array of integers, return indices of the two numbers such that they add up to a specific target.',
    difficulty: 'Easy'
  },
  '2': {
    title: 'Reverse a String',
    description: 'Write a function that reverses a string.',
    difficulty: 'Medium'
  }
};

const ProblemDetail = () => {
  const { id } = useParams();
  const problem = mockProblems[id] || {};

  return (
    <div className="container">
      <h2>{problem.title}</h2>
      <p><strong>Difficulty:</strong> {problem.difficulty}</p>
      <p>{problem.description}</p>
      <Editor />
    </div>
  );
};

export default ProblemDetail;
