import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { username });
      const userObj = res.data; // e.g., { id, username, created_at }
      localStorage.setItem('user', JSON.stringify(userObj)); // ✅ store string
      onLogin(userObj); // ✅ pass full object
    } catch (err) {
      alert('❌ Login failed');
      console.error(err);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-box">
        <h1>👩‍💻 CodeArena</h1>
        <input
          type="text"
          placeholder="Enter your name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="login-input"
        />
        <button onClick={handleLogin} className="login-btn">Login 🚀</button>
      </div>
    </div>
  );
};

export default Login;
