// routes/leaderboard.js
const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
  const query = `SELECT username, score FROM users ORDER BY score DESC LIMIT 10`;

  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: 'Failed to fetch leaderboard.' });
    res.json(results);
  });
});

module.exports = router;
