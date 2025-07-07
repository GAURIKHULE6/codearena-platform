import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Navbar from './components/Navbar';
import ProblemList from './components/ProblemList';
import Editor from './components/Editor';
import './style.css';

const App = () => {
  const [user, setUser] = useState(null);
  const [selectedProblem, setSelectedProblem] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser)); // ✅ parse object
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setSelectedProblem(null);
  };

  if (!user) return <Login onLogin={setUser} />;

  return (
    <div>
      <Navbar username={user.username} onLogout={handleLogout} /> {/* ✅ pass string only */}
      {!selectedProblem ? (
        <ProblemList onSelect={setSelectedProblem} />
      ) : (
        <Editor problem={selectedProblem} user={user} />
      )}
    </div>
  );
};

export default App;
