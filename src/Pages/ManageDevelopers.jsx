import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ManageDevelopers = () => {
  const [developers, setDevelopers] = useState([]);

  // Fetch all developers
  const fetchDevelopers = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/admin/developers');
      setDevelopers(res.data);
    } catch (err) {
      console.error('Error fetching developers:', err);
    }
  };

  useEffect(() => {
    fetchDevelopers();
  }, []);

  const handleApprove = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/admin/developers/approve/${id}`);
      fetchDevelopers(); // Refresh list
    } catch (err) {
      console.error('Error approving developer:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/developers/${id}`);
      fetchDevelopers(); // Refresh list
    } catch (err) {
      console.error('Error deleting developer:', err);
    }
  };

  return (
    <div className="admin-container">
      <h2>👩‍💻 Manage Developers</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {developers.map((dev) => (
            <tr key={dev.id}>
              <td>{dev.username}</td>
              <td>{dev.email}</td>
              <td>{dev.status}</td>
              <td>
                {dev.status !== 'approved' && (
                  <button onClick={() => handleApprove(dev.id)}>Approve</button>
                )}
                <button onClick={() => handleDelete(dev.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageDevelopers;
