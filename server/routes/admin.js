const express = require('express');
const router = express.Router();
const db = require('../db');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your-secret-key';

// ✅ Middleware to verify admin token
function verifyAdmin(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: "Access denied. No token provided." });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(401).json({ message: "Invalid token." });
    if (user.role !== 'admin') return res.status(403).json({ message: "Admins only" });

    req.user = user;
    next();
  });
}

// ✅ Get all developers
router.get('/developers', verifyAdmin, (req, res) => {
  db.query("SELECT id, username, email, status FROM users WHERE role = 'developer'", (err, results) => {
    if (err) {
      console.error('Error fetching developers:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.json(results);
  });
});

// ✅ Approve developer
router.put('/developers/approve/:id', verifyAdmin, (req, res) => {
  db.query('UPDATE users SET status = "approved" WHERE id = ?', [req.params.id], (err) => {
    if (err) {
      console.error('Error approving developer:', err);
      return res.status(500).json({ error: 'Internal error' });
    }
    res.send({ message: '✅ Developer approved' });
  });
});

// ✅ Reject developer
router.put('/developers/reject/:id', verifyAdmin, (req, res) => {
  db.query('UPDATE users SET status = "rejected" WHERE id = ?', [req.params.id], (err) => {
    if (err) {
      console.error('Error rejecting developer:', err);
      return res.status(500).json({ error: 'Internal error' });
    }
    res.send({ message: '❌ Developer rejected' });
  });
});

// ✅ Delete developer
router.delete('/developers/:id', verifyAdmin, (req, res) => {
  db.query('DELETE FROM users WHERE id = ?', [req.params.id], (err) => {
    if (err) {
      console.error('Error deleting developer:', err);
      return res.status(500).json({ error: 'Internal error' });
    }
    res.send({ message: '🗑️ Developer deleted' });
  });
});

// ✅ Add a new problem
router.post('/problems', verifyAdmin, (req, res) => {
  const { title, description, starter_code, expected_output, language_id, difficulty } = req.body;
  const sql = `INSERT INTO problems (title, description, starter_code, expected_output, language_id, difficulty)
               VALUES (?, ?, ?, ?, ?, ?)`;
  db.query(sql, [title, description, starter_code, expected_output, language_id, difficulty], (err) => {
    if (err) return res.status(500).send(err);
    res.send({ message: '✅ Problem added' });
  });
});

// ✅ Get all problems
router.get('/problems', verifyAdmin, (req, res) => {
  db.query('SELECT * FROM problems', (err, results) => {
    if (err) return res.status(500).send(err);
    res.send(results);
  });
});

// ✅ Delete a problem
router.delete('/problems/:id', verifyAdmin, (req, res) => {
  db.query('DELETE FROM problems WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).send(err);
    res.send({ message: '🗑️ Problem deleted' });
  });
});

module.exports = router;
