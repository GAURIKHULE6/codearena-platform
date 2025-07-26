import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';

import Signup from './components/Signup';
import Login from './components/Login';
import AdminLogin from './components/AdminLogin';
import AdminNavbar from './components/AdminNavbar';
import Navbar from './components/Navbar';
import Homepage from './components/Homepage';
import ProblemList from './components/ProblemList';
import CodeEditor from './components/Editor';
import AdminDashboard from './components/AdminDashboard';
import Leaderboard from './Pages/Leaderboard';

import ManageDevelopers from './Pages/ManageDevelopers';
import ManageRecruiters from './Pages/ManageRecruiters';
import ManageContests from './Pages/ManageContests';
import ViewReports from './Pages/ViewReports';
import AddProblems from './Pages/AddProblems';

import './style.css';

const App = () => {
  const [user, setUser] = useState(null);
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [showLogin, setShowLogin] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const saved = localStorage.getItem('user');
    if (saved) {
      setUser(JSON.parse(saved));
    }
  }, []);

  const handleLogin = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    navigate('/');
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('adminLoggedIn');
    setUser(null);
    navigate('/');
  };

  const isAdminLoggedIn = localStorage.getItem('adminLoggedIn') === 'true';

  // Show login/signup conditionally
  if (!user && !isAdminLoggedIn && !['/admin-login'].includes(location.pathname)) {
    return showLogin ? (
      <Login onLogin={handleLogin} switchToSignup={() => setShowLogin(false)} />
    ) : (
      <Signup switchToLogin={() => setShowLogin(true)} />
    );
  }

  return (
    <>
      {user && <Navbar username={user.username} role={user.role} onLogout={handleLogout} />}
      {isAdminLoggedIn && <AdminNavbar />}

      <Routes>
        <Route path="/" element={<Homepage />} />
  <Route path="/leaderboard" element={<Leaderboard />} />

        <Route
          path="/problems"
          element={
            <ProblemList
              onSelect={(problem) => {
                setSelectedProblem(problem);
                navigate('/editor');
              }}
            />
          }
        />
        <Route path="/editor" element={<CodeEditor problem={selectedProblem} user={user} />} />
        <Route path="/login" element={<Login onLogin={handleLogin} switchToSignup={() => setShowLogin(false)} />} />
        <Route path="/signup" element={<Signup switchToLogin={() => setShowLogin(true)} />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-dashboard/manage-developers" element={<ManageDevelopers />} />


        {/* ✅ Admin Routes Protected */}
        <Route
          path="/admin-dashboard"
          element={isAdminLoggedIn ? <AdminDashboard /> : <Navigate to="/admin-login" />}
        />
        <Route
          path="/manage-developers"
          element={isAdminLoggedIn ? <ManageDevelopers /> : <Navigate to="/admin-login" />}
        />
        <Route
          path="/manage-recruiters"
          element={isAdminLoggedIn ? <ManageRecruiters /> : <Navigate to="/admin-login" />}
        />
        <Route
          path="/manage-contests"
          element={isAdminLoggedIn ? <ManageContests /> : <Navigate to="/admin-login" />}
        />
        <Route
          path="/view-reports"
          element={isAdminLoggedIn ? <ViewReports /> : <Navigate to="/admin-login" />}
        />
        <Route
          path="/add-problems"
          element={isAdminLoggedIn ? <AddProblems /> : <Navigate to="/admin-login" />}
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default App;
