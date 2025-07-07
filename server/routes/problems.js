const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
  const difficulty = req.query.difficulty;

  const sql = difficulty
    ? 'SELECT * FROM problems WHERE difficulty = ?'
    : 'SELECT * FROM problems';

  db.query(sql, difficulty ? [difficulty] : [], (err, results) => {
    if (err) return res.status(500).send(err);
    res.send(results);
  });
});

module.exports = router;
