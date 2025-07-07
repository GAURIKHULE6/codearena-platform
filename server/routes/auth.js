const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/login', (req, res) => {
  const { username } = req.body;
  db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
    if (err) return res.status(500).send(err);

    if (results.length > 0) {
      res.send(results[0]);
    } else {
      db.query('INSERT INTO users (username) VALUES (?)', [username], (err, result) => {
        if (err) return res.status(500).send(err);
        res.send({ id: result.insertId, username });
      });
    }
  });
});

module.exports = router;
