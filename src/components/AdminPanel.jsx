// components/AdminPanel.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../style.css';

const AdminPanel = () => {
  const [problems, setProblems] = useState([]);
  const [form, setForm] = useState({
    title: '', description: '', starter_code: '', expected_output: '', language_id: 71, difficulty: 'Easy'
  });

  const fetchProblems = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/admin/problems', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProblems(res.data);
    } catch (err) {
      console.error('❌ Error fetching:', err);
      alert('Access Denied or Server Error');
    }
  };

useEffect(() => {
  try {
    fetchProblems();
  } catch (e) {
    console.error("AdminPanel Load Error:", e);
  }
}, []);

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/admin/problems', form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchProblems();
      setForm({ title: '', description: '', starter_code: '', expected_output: '', language_id: 71, difficulty: 'Easy' });
    } catch (err) {
      console.error('❌ Error adding:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/admin/problems/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchProblems();
    } catch (err) {
      console.error('❌ Error deleting:', err);
    }
  };

  return (
    <div className="admin-panel">
      <h2>🛠 Admin Panel</h2>
      <input placeholder="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
      <textarea placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
      <textarea placeholder="Starter Code" value={form.starter_code} onChange={e => setForm({ ...form, starter_code: e.target.value })} />
      <input placeholder="Expected Output" value={form.expected_output} onChange={e => setForm({ ...form, expected_output: e.target.value })} />
      <select value={form.difficulty} onChange={e => setForm({ ...form, difficulty: e.target.value })}>
        <option>Easy</option>
        <option>Medium</option>
        <option>Hard</option>
      </select>
      <button onClick={handleSubmit}>Add Problem</button>

      <h3>📝 Existing Problems</h3>
      <ul>
        {problems.map(p => (
          <li key={p.id}>
            {p.title} ({p.difficulty})
            <button onClick={() => handleDelete(p.id)}>🗑 Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPanel;
