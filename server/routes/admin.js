const express = require('express');
const router = express.Router();
const db = require('../db');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your-secret-key';

// Middleware to verify JWT and role
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
// Protected Admin Routes
router.post('/problems', verifyAdmin, (req, res) => {
  const { title, description, starter_code, expected_output, language_id, difficulty } = req.body;
  const sql = `INSERT INTO problems (title, description, starter_code, expected_output, language_id, difficulty) VALUES (?, ?, ?, ?, ?, ?)`;
  db.query(sql, [title, description, starter_code, expected_output, language_id, difficulty], (err) => {
    if (err) return res.status(500).send(err);
    res.send({ message: '✅ Problem added' });
  });
});

router.get('/problems', verifyAdmin, (req, res) => {
  db.query('SELECT * FROM problems', (err, results) => {
    if (err) return res.status(500).send(err);
    res.send(results);
  });
});

router.delete('/problems/:id', verifyAdmin, (req, res) => {
  db.query('DELETE FROM problems WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).send(err);
    res.send({ message: '🗑️ Problem deleted' });
  });
});

module.exports = router;
