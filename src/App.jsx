import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import AdminPanel from './components/AdminPanel';
import Navbar from './components/Navbar';
import ProblemList from './components/ProblemList';
import CodeEditor from './components/Editor';
import Homepage from './components/Homepage';
import './style.css';

const App = () => {
  const [user, setUser] = useState(null);
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [showLogin, setShowLogin] = useState(true);
  const navigate = useNavigate();

useEffect(() => {
  const saved = localStorage.getItem('user');
  if (saved) {
    const parsedUser = JSON.parse(saved);
    console.log('User loaded:', parsedUser); // ✅ debug
    setUser(parsedUser);
  }
}, []);

const handleLogin = (userData) => {
  console.log("🔐 Logged in user:", userData); // 🐞 Debug
  setUser(userData);
  localStorage.setItem('user', JSON.stringify(userData));
  navigate('/');
};

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setSelectedProblem(null);
    setShowLogin(true);
    navigate('/');
  };

  if (!user) {
    return showLogin ? (
      <Login onLogin={handleLogin} switchToSignup={() => setShowLogin(false)} />
    ) : (
      <Signup switchToLogin={() => setShowLogin(true)} />
    );
  }

  return (
    
    <>

      <Navbar username={user.username} role={user.role} onLogout={handleLogout} />
<Routes>
  <Route path="/" element={<Homepage />} />
  <Route
    path="/problems"
    element={<ProblemList onSelect={(problem) => {
      setSelectedProblem(problem);
      navigate('/editor');
    }} />}
  />
  <Route path="/editor" element={<CodeEditor problem={selectedProblem} user={user} />} />
  
  {/* ✅ Secure Admin Route */}
{user?.role === 'admin' && (
  <Route path="/admin" element={<AdminPanel />} />
)}
  <Route path="/login" element={<Login onLogin={handleLogin} />} />
  <Route path="/signup" element={<Signup switchToLogin={() => navigate('/login')} />} />
  <Route path="*" element={<Navigate to="/" replace />} />
</Routes>
    </>
  );
};

export default App;
